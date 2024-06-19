import React, { useEffect } from 'react';
import { Div, Button, Text } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userLoggedIn } from '../../../redux/currentUser/actions';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'
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
    user = await AsyncStorage.getItem('@user')
    console.log(user)
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken)
      }
    } else {
      dispatch(userLoggedIn(user))
      navigation.navigate('Home')
    }
  }
  const getUserInfo = async (token) => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      )
      const user = await response.json()
      console.log(user)
      await AsyncStorage.setItem('@user', JSON.stringify(user))
      await dispatch(userLoggedIn(user))
    } catch (e) {
      console.log(e)
    }
  }
  const signInWithGoogle = async () => {
    console.log("Hi")
    try {
      console.log("Start")
      await promptAsync()
      console.log(end)
    } catch (e) {
      console.log(e)
    }

  }
  useEffect(() => {
    handleSigninWithGoogle()
  }, [response])
  return (
    <Div flex={1} justifyContent='center' alignItems='center' bg="gray900">
      <Button alignSelf='center' onPress={signInWithGoogle}>Login with Google</Button>
    </Div>
  );
}
