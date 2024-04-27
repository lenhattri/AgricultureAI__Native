import React from "react";

import { Div, Avatar, Text, Icon } from "react-native-magnus";

export default function Message(props) {
  return (
    <Div
      row
      alignItems="flex-start"
      justifyContent="flex-start"
      mx={10}
    >
      {props.imageUri ? (
        <Avatar
          shadow={1}
          size={20}
          source={{
            uri: props.imageUri,
          }}
        />
      ) : (
        <Avatar bg="green800" size={20}>
          <Icon name="user" color="white" fontFamily="Feather" />
        </Avatar>
      )}
      <Div bg="transparent" p={20} mt={"-5%"} rounded={100}>
        <Text color="white" fontWeight="bold" fontSize={10}>
          {props.username}
        </Text>
        <Text color="white" fontSize={17}>
        { props.message}
        </Text>
      </Div>
    </Div>
  );
}
