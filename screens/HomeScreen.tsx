import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addMovie, addToFavorites } from '../redux/actions/movieActions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AddMovieModal from '../components/Modal';

// Later move to .env
const API_KEY = '66887066a285140001c7a7fd0639e457';
const BASE_URL = 'https://api.themoviedb.org/3';

function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleSubmitMovie = (newMovieData:any) => {
    // Dispatch the addMovie action to add the new movie to Redux (My Movies)
    dispatch(addToFavorites(newMovieData));
  };


  const navigation = useNavigation();
  // Access movies from Redux store
  const movies = useSelector((state: RootState) => state.movie.movies);

  // Access the dispatch function from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch movies from TMDB API and add them to Redux store
    fetchMovies(page);
  }, [dispatch, page, navigation]);

  const fetchMovies = (pageNumber:number) => {
    if (pageNumber > totalPages || loading) {
      return; // Don't fetch more data if all pages are loaded or loading is in progress
    }
    
    setLoading(true);

    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
      .then((response) => {
        const moviesData = response.data.results;

        // Dispatch the addMovie action to add movies to Redux store
        moviesData.forEach((movie:any) => {
          dispatch(
            addMovie({
              title: movie.title,
              overview: movie.overview,
              releaseDate: movie.release_date,
              rating: movie.vote_average,
              posterPath: movie.poster_path,
            })
          );
        });

        setPage(pageNumber + 1);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  //show Activity Indicator if data loading from API
  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ padding: 16 }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 16, marginTop: 20 }}>
        All Movies
      </Text>
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${item.posterPath}` }}
              style={{ width: 300, height: 450 }}
            />
            <Text>{item.overview}</Text>
            <Text>Release Date: {item.releaseDate}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
        onEndReached={() => fetchMovies(page + 1)} // Load more data when reaching the end
        onEndReachedThreshold={0.15} // Trigger when 15% from the end
        ListFooterComponent={renderFooter()} // Show loading indicator or null
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20, // Adjust as needed
          right: 20, // Adjust as needed
          backgroundColor: 'blue', // Button background color
          borderRadius: 30, // Adjust to make the button round
          padding: 15,
        }}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <AddMovieModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitMovie}
      />
    </View>
  );
}

export default HomeScreen;
