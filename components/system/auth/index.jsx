import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Div, Text } from 'react-native-magnus';

export default function Auth(Component) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
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
