import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface AddMovieModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (movieData: MovieData) => void;
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      padding: 10,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 10,
    },
    submitButton: {
      backgroundColor: 'blue',
      color: 'white',
    },
    cancelButton: {
      backgroundColor: 'red',
      color: 'white',
    },
  });
  

interface MovieData {
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  poster: string; // Store the poster image URL
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isVisible, onClose, onSubmit }) => {
  const [movieData, setMovieData] = useState<MovieData>({
    title: '',
    overview: '',
    releaseDate: '',
    rating: 0,
    poster: '', // Initially empty
  });

  const handleInputChange = (fieldName: keyof MovieData, value: string | number) => {
    setMovieData({ ...movieData, [fieldName]: value });
  };

  const handlePosterSelection = (imageURI: string) => {
    setMovieData({ ...movieData, poster: imageURI });
  };

  const handleCaptureImage = () => {
    // Implement image capture logic here (e.g., using a library like react-native-image-picker)
  };

  const handleSubmit = () => {
    // Submit movieData to Redux or perform any other action
    onSubmit(movieData);

    // Clear the form
    setMovieData({
      title: '',
      overview: '',
      releaseDate: '',
      rating: 0,
      poster: '',
    });

    // Close the modal
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Add New Movie</Text>
    <TextInput
      style={styles.input}
      placeholder="Title"
      value={movieData.title}
      onChangeText={(text) => handleInputChange('title', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Overview"
      value={movieData.overview}
      onChangeText={(text) => handleInputChange('overview', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Release Date"
      value={movieData.releaseDate}
      onChangeText={(text) => handleInputChange('releaseDate', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Rating"
      value={movieData.rating.toString()}
      onChangeText={(text) => handleInputChange('rating', parseFloat(text))}
      keyboardType="numeric"
    />
    <View style={styles.buttonContainer}>
      <Button title="Select Poster" onPress={() => handlePosterSelection('imageURI')} />
      <Button title="Capture Image" onPress={handleCaptureImage} />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}><Text>Cancel</Text></TouchableOpacity>
    </View>
  </View>
</Modal>

  );

  
};

export default AddMovieModal;
