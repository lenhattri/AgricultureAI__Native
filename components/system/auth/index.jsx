import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Div, Text } from 'react-native-magnus';
import store from '../../../redux/store';
import { useSelector } from 'react-redux';
import { userLoggedIn } from '../../../redux/currentUser/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(Component) {
  const [initializing, setInitializing] = useState(true);
  const user = AsyncStorage.getItem('@user')
  const navigation = useNavigation();

  // Handle user state changes
  

  useEffect(() => {
   console.log(user)
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function Wrapper(props) {
    if (initializing) {
      return (
        <Div>
            <Text>Is loading...</Text>
        </Div>
      );
    } else {
      if (!user) {
        navigation.navigate('Login');
        return null;
      } else {
        return (
            <Component {...props} />
        );
      }
    }
  }
  return Wrapper;
}
