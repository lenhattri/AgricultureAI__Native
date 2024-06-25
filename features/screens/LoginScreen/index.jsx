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
    user = await AsyncStorage.getItem('@user');
    console.log(user);
    if (!user && response?.type === 'success') {
      await getUserInfo(response.authentication.accessToken);
    } else if (user) {
      dispatch(userLoggedIn(JSON.parse(user)));
      navigation.navigate('Home');
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
        body: JSON.stringify({ user: googleUser }),
      });
      const { token: jwtToken, newUser } = await backendResponse.json();

      // If the user is new, save the new user data
      if (newUser) {
        await AsyncStorage.setItem('@user', JSON.stringify(googleUser));
      }

      // Store JWT token and user info
      await AsyncStorage.setItem('@jwtToken', jwtToken);
      await AsyncStorage.setItem('@user', JSON.stringify(googleUser));

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
