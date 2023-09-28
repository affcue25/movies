import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import AddMovie from './screens/AddMovie';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMovie" component={AddMovie} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
