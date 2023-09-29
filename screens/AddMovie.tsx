import React from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


// Type for the navigation object
type AddMovieProps = {
    navigation: NavigationProp<any>; // Replace 'any' later with navigator's navigation type if available
  };

function AddMovie() {
  const navigation = useNavigation();
  const movies = useSelector((state: RootState) => state.movie.favorites);


  return (
    <View style={{flex:1}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 16, marginTop: 20 }}>
        My Movies
      </Text>
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={{ padding: 16, }}>
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
        // onEndReached={() => fetchMovies(page + 1)} // Load more data when reaching the end
        // onEndReachedThreshold={0.15} // Trigger when 15% from the end
        // ListFooterComponent={renderFooter()} // Show loading indicator or null
      />
    </View>
  );
}

AddMovie.navigationOptions = ({ navigation }: AddMovieProps) => ({
  title: 'Add Movies',
  headerLeft: () => (
    <Button
      title="Back"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
});

export default AddMovie;
