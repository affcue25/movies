import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


// Type for the navigation object
type AddMovieProps = {
    navigation: NavigationProp<any>; // Replace 'any' later with navigator's navigation type if available
  };

function AddMovie() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Add Movie Screen</Text>
    </View>
  );
}

AddMovie.navigationOptions = ({ navigation }: AddMovieProps) => ({
  title: 'Add Movie',
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
