import React from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { removeFromFavorites } from '../redux/actions/movieActions';


// Type for the navigation object
type AddMovieProps = {
    navigation: NavigationProp<any>; // Replace 'any' later with navigator's navigation type if available
  };

function AddMovie() {
  
  const moviesFav = useSelector((state: RootState) => state.movie.favorites);
  
  const dispatch = useDispatch();

  const toggleFavorite = (item:any) => {
      dispatch(removeFromFavorites(item))
  }

  return (
    <View style={{flex:1, backgroundColor: 'black'}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 16, marginTop: 20, color: 'white' }}>
        My Movies
      </Text>
      
      <FlatList
        data={moviesFav}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={{ padding: 16, }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
            <Image
              source={{ uri: item.id? `https://image.tmdb.org/t/p/w500/${item.posterPath}`: item.posterPath}}
              style={{ width: 300, height: 450 }}
            />
            <Text style={{textAlign: "justify", color: 'white'}}>{item.overview}</Text>
            <Text style={{ color: 'white'}}>Release Date: {item.releaseDate}</Text>
            <Text style={{ color: 'white'}}>Rating: {item.rating}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialCommunityIcons
                name={'heart'}
                size={24}
                color={'red'}
              />
            </TouchableOpacity>
          </View>
        )}
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
