// LoginScreen.js
import React from 'react';
import { Div, Button } from 'react-native-magnus';
import { useGoogleSignIn } from './useGoogleSignIn';

export default function LoginScreen() {
  const { promptAsync } = useGoogleSignIn();

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Div flex={1} justifyContent='center' alignItems='center' bg="gray900">
      <Button alignSelf='center' onPress={signInWithGoogle}>Login with Google</Button>
    </Div>
  );
}
