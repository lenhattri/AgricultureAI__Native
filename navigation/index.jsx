import React from "react";
import HomeScreen from "../features/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Button, Icon, Div } from "react-native-magnus";
import HomepageHeaderConfig from "./config/HomePage";
import LoginScreen from "../features/screens/LoginScreen"
import Auth from "../components/system/auth";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Home"
        component={Auth(HomeScreen)}
        options={HomepageHeaderConfig}
      />
    </Stack.Navigator>
  );
}
