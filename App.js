import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './app/screens/SignUp'
import Login from './app/screens/Login'
import Home from './app/screens/Home'
import Chat from './app/screens/Chat'
import {firebase} from '@react-native-firebase/messaging'


const Stack = createNativeStackNavigator()

const App = () => {


  

  useEffect(()=>{


  const getToken = async()=>{
    try {
      const token = await firebase.messaging().getToken()
    console.log('token',token);
    } catch (error) {
      console.log('token error',error);
    }
    
  }

    getToken()
  })

  firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('message handled in background',remoteMessage);
  })


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