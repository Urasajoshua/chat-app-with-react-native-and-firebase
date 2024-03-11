import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase as auth,  } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.auth().onAuthStateChanged(userExist => {
      setUser(userExist);
    });

    return () => unsubscribe(); 
  }, []);

  
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const snapshot = await firebase.firestore().collection('chats')
            .where('senderId', 'in', [user.uid, route.params.uid])
            .where('receiverId', 'in', [user.uid, route.params.uid])
            .orderBy('createdAt', 'desc')
            .get();
  
          const newMessages = snapshot.docs.map(doc => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: {
              _id: doc.data().senderId,
              name: doc.data().senderName,
            },
            receiverId: doc.data().receiverId,
          }));
  
          setMessages(newMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchData();
    }
  }, [user, route.params.uid]);
  

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text } = messages[0];
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    firebase.firestore().collection('chats').add({
      _id,
      createdAt,
      text,
      senderId: user.uid,
      senderName: user.email,
      receiverId: route.params.uid,
      receiverName: route.params.name,
    });
  }, [user, route.params.uid]);

  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: user ? user.uid : '',
        name: user ? user.email : '',
      }}
    />
  );
};

export default Chat;
