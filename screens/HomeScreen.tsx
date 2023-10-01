import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addMovie, addToFavorites, removeFromFavorites } from '../redux/actions/movieActions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AddMovieModal from '../components/Modal';
import MainContainer from '../MainContainer';

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
    navigation.navigate("AddMovie");
  };


  const navigation = useNavigation();
  // Access movies from Redux store
  const movies = useSelector((state: RootState) => state.movie.movies);
  const moviesFav = useSelector((state: RootState) => state.movie.favorites);

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
              id: movie.id,
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

  const toggleFavorite = (item:any) => {
    if(moviesFav.find(movItem => movItem?.id === item?.id)){
      dispatch(removeFromFavorites(item))
    }else{
      dispatch(addToFavorites(item))

    }

  }

  const isFavorite = (item: any) => {
    if(moviesFav.find(movItem => movItem?.id === item?.id))
      return true;
    else
      return false;
  }

  //show Activity Indicator if data loading from API
  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ padding: 16, marginBottom: 20 }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <MainContainer>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 16, marginTop: 20, color: 'white' }}>
        All Movies
      </Text>
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${item.posterPath}` }}
              style={{ width: 300, height: 450 }}
            />
            <Text style={{color: 'white'}}>{item.overview}</Text>
            <Text style={{color: 'white'}}>Release Date: {item.releaseDate}</Text>
            <Text style={{color: 'white'}}>Rating: {item.rating}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialCommunityIcons
                name={isFavorite(item) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(item) ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </View>
        )}
        onEndReached={() => fetchMovies(page + 1)} // Load more data when reaching the end
        onEndReachedThreshold={0.15} // Trigger when 15% from the end
        ListFooterComponent={renderFooter()} // Show loading indicator or null
      />
      <AddMovieModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitMovie}
      />
      </MainContainer>
    </View>
  );
}

export default HomeScreen;
