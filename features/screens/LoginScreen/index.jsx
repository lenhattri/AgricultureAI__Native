import React, { useEffect } from 'react';
import { Div, Button } from 'react-native-magnus';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userLoggedIn } from '../../../redux/currentUser/actions';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  const handleSigninWithGoogle = async () => {
    console.log('handle sign in with google');
    const user = await AsyncStorage.getItem('@user');
    const token = await AsyncStorage.getItem('@jwtToken');
    console.log("Retrieved user:", user);
    console.log("Retrieved token:", token);

    if (!user && !token && response?.type === 'success') {
      console.log("has no user, token: ", token)
      await getUserInfo(response.authentication.accessToken);
    } else if (user) {
      console.log("has user, token: ", token)
      console.log(user)
      try {
        const parsedUser = JSON.parse(user);
        dispatch(userLoggedIn(parsedUser));
        navigation.navigate('Home');
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }
  };

  const getUserInfo = async (token) => {
    if (!token) {
      return;
    }

    try {
      const googleResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const googleUser = await googleResponse.json();
      // Send Google user info to backend
      
      const backendResponse = await fetch('http://localhost:3000/api/v1/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: googleUser
        }),
      });
      
      
      console.log("auth gooogle api call finished")
      const {newUser, userId,token: jwtToken } = await backendResponse.json()
      console.log("new user: ", newUser)
      // If the user is new, save the new user data
      if (newUser) {
        await AsyncStorage.setItem('@user', JSON.stringify({ ...googleUser, "id": userId }));
      }

      // Store JWT token and user info
      await AsyncStorage.setItem('@jwtToken', jwtToken);
      await AsyncStorage.setItem('@user', JSON.stringify({ ...googleUser, "id": userId }));

      dispatch(userLoggedIn(googleUser));
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleSigninWithGoogle();
  }, [response]);

  return (
    <Div flex={1} justifyContent='center' alignItems='center' bg="gray900">
      <Button alignSelf='center' onPress={signInWithGoogle}>Login with Google</Button>
    </Div>
  );
}
