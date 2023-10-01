import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddMovieModal from './Modal';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/actions/movieActions';
import { useNavigation } from '@react-navigation/native';

interface BottomNavigationBarProps {
//add props here if require later
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitMovie = (newMovieData:any) => {
    // Dispatch the addToFavorites action to add the fav movie to Redux (My Movies)
    dispatch(addToFavorites(newMovieData));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navigationButton}>
        <Text style={{color:"white"}}>All Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons name="ios-add" size={36} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navigationButton} onPress={()=> navigation.navigate("AddMovie")}>
        <Text style={{color:"white"}}>My Movies</Text>
      </TouchableOpacity>

      <AddMovieModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#5D12D2',
  },
  navigationButton: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top:-30
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigationBar;
