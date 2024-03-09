import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {firebase as auth} from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/firestore'


const SignUp = ({navigation}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setname] = useState("")

  const signupUser = () => {
    auth.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            console.log('User created:', userCredentials.user);
            
            // Create a user document in Firestore
            firebase.firestore().collection('users').doc(userCredentials.user.uid).set({
                id: userCredentials.user.uid,
                name: name, 
                email: userCredentials.user.email,
            })
            .then(() => {
                console.log('User document created in Firestore');
                // Navigate to login screen
                navigation.navigate('login');
            })
            .catch((error) => {
                console.error('Error creating user document in Firestore:', error);
            });
        })
        .catch((error) => {
            console.log('Error in creating user:', error);
        });
};
  return (
    <View>
      <View style={{padding:10}}>
        <Text style={{textAlign:'center',fontSize:22}}>Sign up</Text>
      </View>

      {/**form filled */}
      <View style={{alignItems:'center',justifyContent:'center',margin:5}}>

        {/**name */}
      <View style={{width:'100%',paddingLeft:10,paddingRight:10,borderRadius:50}}>
        <TextInput value={name} onChangeText={(text)=>setname(text)} style={{borderWidth:1}} placeholder='write you name'/>
        </View>

        {/**email */}
        <View style={{width:'100%',paddingLeft:10,paddingRight:10,borderRadius:50,marginTop:10}}>
        <TextInput value={email} onChangeText={(text)=>setEmail(text)} style={{borderWidth:1}} placeholder='write you email'/>
        </View>


        {/**password */}
        <View style={{width:'100%',paddingLeft:10,paddingRight:10,borderRadius:50,marginTop:10}}>
        <TextInput value={password} onChangeText={(text)=>setPassword(text)} style={{borderWidth:1}} placeholder='write you password' secureTextEntry/>
        </View>

        <Pressable onPress={signupUser} style={{marginTop:10,borderWidth:1,width:80,padding:10}}>
          <Text style={{textAlign:'center'}}>SignUp</Text>
        </Pressable>
      </View>

      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Pressable style={{marginTop:10,borderWidth:1,width:220,padding:10}} onPress={()=>navigation.navigate('login')}>
          <Text style={{textAlign:"center"}}>already have account login</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})