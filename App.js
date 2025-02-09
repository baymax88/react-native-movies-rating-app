import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/scenes/Home'
import Movie from './src/scenes/Movie'
import Review from './src/scenes/Review'
import AddReview from './src/scenes/AddReview'
import SearchResult from './src/scenes/SearchResult'
import LogIn from './src/scenes/LogIn'
import Register from './src/scenes/Register'
import UserProfile from './src/scenes/UserProfile'
import UserEdit from './src/scenes/UserEdit'

import { GlobalProvider } from './src/context/GlobalState'

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Movie" component={Movie}></Stack.Screen>
          <Stack.Screen name="Review" component={Review}></Stack.Screen>
          <Stack.Screen name="AddReview" component={AddReview}></Stack.Screen>
          <Stack.Screen name="SearchResult" component={SearchResult}></Stack.Screen>
          <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
          <Stack.Screen name="UserProfile" component={UserProfile}></Stack.Screen>
          <Stack.Screen name="UserEdit" component={UserEdit}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}