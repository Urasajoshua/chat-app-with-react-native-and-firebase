import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const [email,setEmail]= useState("")


    const getEmail = async ()=>{
        try {
            const userEmail = await AsyncStorage.getItem('email')
            
            setEmail(userEmail)
            return userEmail
        } catch (error) {
            
        }
    }

    const getData = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('email');
            const querySnapshot = await firebase.firestore().collection('users').where('email','!=',userEmail).get();
            if (!querySnapshot.empty) {
                const fetchedUsers = querySnapshot.docs.map(doc => doc.data());
                setUsers(fetchedUsers);
        
            } else {
                console.log('No users found');
            }
        } catch (error) {
            console.error('Error getting users: ', error);
        }
    };


    

    useEffect(() => {
        getEmail()
        getData();
    }, []); 

    return (
        <View>
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center' }}>Users</Text>
            </View>
            <View>
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={()=>navigation.navigate('chat',{uid: item.id,name:item.name})}>
                            <Text style={{paddingLeft:10,fontSize:24}}>{item.name}</Text>
                            <Text>{item.email}</Text>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});
