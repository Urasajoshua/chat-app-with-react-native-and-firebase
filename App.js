import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './app/screens/SignUp'
import Login from './app/screens/Login'
import Home from './app/screens/Home'
import Chat from './app/screens/Chat'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='signup' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='chat' component={Chat}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})