import { StyleSheet, Text, View ,TextInput,Pressable} from 'react-native'
import React, { useState } from 'react'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const loginupUser =()=>{
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      navigation.navigate('home')
      const userEmail= AsyncStorage.setItem('email',email)
    }).catch((error)=>{
      console.log('this is error in creating user', error);
    })
  }
  return (
    <View>
      <View style={{padding:10}}>
        <Text style={{textAlign:'center',fontSize:22}}>Login</Text>
      </View>

      {/**form filled */}
      <View style={{alignItems:'center',justifyContent:'center',margin:5}}>
        <View style={{width:'100%',paddingLeft:10,paddingRight:10,borderRadius:50}}>
        <TextInput value={email} onChangeText={(text)=>setEmail(text)} style={{borderWidth:1}} placeholder='write you email'/>
        </View>


        {/**password */}
        <View style={{width:'100%',paddingLeft:10,paddingRight:10,borderRadius:50,marginTop:10}}>
        <TextInput value={password} onChangeText={(text)=>setPassword(text)} style={{borderWidth:1}} placeholder='write you password' secureTextEntry/>
        </View>

        <Pressable onPress={loginupUser} style={{marginTop:10,borderWidth:1,width:80,padding:10}}>
          <Text style={{textAlign:'center'}}>login</Text>
        </Pressable>
      </View>

      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Pressable style={{marginTop:10,borderWidth:1,width:220,padding:10}} onPress={()=>navigation.navigate('signup')}>
          <Text style={{textAlign:"center"}}>don`t` have an account signup</Text>
        </Pressable>
      </View>
    </View>)
}

export default Login

const styles = StyleSheet.create({})