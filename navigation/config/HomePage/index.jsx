import { Div, Button, Icon } from "react-native-magnus";
import React from "react";



export default function HomepageHeaderConfig() {
  return {
    title: "Bác Hai Lúa",
    headerTitleAlign: "left",
    headerStyle: {
      backgroundColor: "#343745",
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
    },
    headerLeft: () => (
      <Div>
        <Button
          bg="transparent"
          h={40}
          w={40}
          rounded="circle"
        >
          <Icon name="menu" color="white" fontFamily="Entypo" fontSize={20} />
        </Button>
      </Div>
    ),
    headerRight: () => (
      <Button bg="transparent" h={40} w={40} rounded="circle">
        <Icon
          name="more-vertical"
          color="white"
          fontFamily="Feather"
          fontSize={20}
        />
      </Button>
    ),
  };
}
