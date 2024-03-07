import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {firebase as auth} from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/firestore'


const SignUp = ({navigation}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setname] = useState("")

  const signupUser = ()=>{
     auth.auth().createUserWithEmailAndPassword(email,password).then((userCredentials)=>{
      const user = userCredentials.user;
      user.updateProfile({displayName:name,photoURL:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.newyorker.com%2Fphotos%2F5de59f9310863b0009e9d541%2F4%3A3%2Fw_2560%2Ch_1920%2Cc_limit%2FSchulman-PeterDinklage.jpg&tbnid=qybVl78lQyCDtM&vet=12ahUKEwi2uffPt-KEAxW9micCHVYpAEMQMygLegUIARCHAQ..i&imgrefurl=https%3A%2F%2Fwww.newyorker.com%2Fculture%2Fthe-new-yorker-interview%2Fpeter-dinklage-is-still-punk-rock&docid=G1out5kdFLi5SM&w=2560&h=1920&q=peter&client=firefox-b-d&ved=2ahUKEwi2uffPt-KEAxW9micCHVYpAEMQMygLegUIARCHAQ'
      })
      navigation.navigate('login')
    }).catch((error)=>{
      console.log('this is error in creating user', error);
    })
  }
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