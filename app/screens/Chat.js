import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase as auth } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const { uid } = route.params;



  useEffect(()=>{
    const userCheck = auth.auth().onAuthStateChanged(userExist =>{
        if(userExist){
            setUser(userExist)
            console.log('user exist',userExist);
        }
        else{
            setUser("")
        }
    })
},[])

  

  

  useLayoutEffect(() => {
    const message =firebase.firestore().collection('chats').orderBy('createdAt','desc').onSnapshot(snapShot =>setMessages(snapShot.docs.map(doc=>({
        _id:doc.data()._id,
        createdAt:doc.data().createdAt.toDate(),
        text:doc.data().text,
        user:doc.data().user
    }))))
    return message
  }, ); 


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages,messages))
    const {_id,createdAt,text,user} = messages[0]
    firebase.firestore().collection('chats').add({_id,createdAt,text,user})
  })

 


  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: user.uid,
        name: user.email,
        
        
      }}
    />
  );
};

export default Chat;
