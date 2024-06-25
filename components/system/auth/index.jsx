import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Div, Text } from 'react-native-magnus';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../../redux/currentUser/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(Component) {
  const [initializing, setInitializing] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Handle user state changes
  useEffect(() => {
    const checkUserToken = async () => {
      const user = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@jwtToken');
      
      console.log("auth user: ",user);
      console.log("auth token: ",token);
      if (user && token) {
        const userObj = JSON.parse(user);
        const userId = userObj.id;
        console.log("auth check token")
        try {
          const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const userData = await response.json();
            dispatch(userLoggedIn(userData));
          } else {
            await AsyncStorage.removeItem('@user');
            await AsyncStorage.removeItem('@jwtToken');
            navigation.navigate('Login');
          }
        } catch (error) {
          console.error(error);
          await AsyncStorage.removeItem('@user');
          await AsyncStorage.removeItem('@jwtToken');
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Login');
      }

      setInitializing(false);
    };

    checkUserToken();
  }, [dispatch, navigation]);

  function Wrapper(props) {
    if (initializing) {
      return (
        <Div>
          <Text>Is loading...</Text>
        </Div>
      );
    } else {
      return <Component {...props} />;
    }
  }

  return Wrapper;
}
