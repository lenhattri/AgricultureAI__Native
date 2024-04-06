import React, { useContext } from "react";

import { useState } from "react";
import { Avatar, Div, Icon, Text, Input, Button } from "react-native-magnus";
import Message from "../../../components/Message";
import useGptGenerater from "../../../hooks/useGptGenerater";
export default function HomeScreen() {
  const [promptInput, setPromptInput] = useState("");
  const {
    currentThreadId,
    messages,
    isLoading,
    error,
    createThread,
    continueConversation,
    switchThread,
  } = useGptGenerater();

  const handleGenerate = async () => {
    console.log("start handleGenerate ")
    if (currentThreadId) {
      await continueConversation(promptInput);
    } else {
      await createThread();
      if (currentThreadId) {
        
        await continueConversation(promptInput);
      }
    }
    setPromptInput("");
  };

  const userDetailRole = {
    name: "BẠN",
  };
  const assistantDetailRole = {
    name: "BÁC HAI LÚA",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png",
  };

  useContext(() => {}, []);
  return (
    <Div column flex={1} justifyContent="flex-start" bg="gray900">
      <Div column flex={1} justifyContent="flex-start" my={39}>
        <Div flex={6} overflow="scroll">
          {currentThreadId ? (
            messages.map((message) => (
              <>
                {message.role === "user" ? (
                  <Message
                    username={userDetailRole.name}
                    message={message.content}
                  />
                ) : (
                  <Message
                    username={assistantDetailRole.name}
                    message={message.content}
                    imageUri={assistantDetailRole.imageUri}
                  />
                )}
              </>
            ))
          ) : (
            <Div>
              <Avatar
                shadow={1}
                size={20}
                source={{
                  uri: assistantDetailRole.imageUri,
                }}
              />
            </Div>
          )}
        </Div>
        <Div flex={1} row justifyContent="center" alignItems="flex-end">
          <Div flex={2}></Div>
          <Input
            flex={7}
            placeholder="Nhập tin nhắn tại đây..."
            fontSize={18}
            p={10}
            bg="gray800"
            rounded={100}
            color="gray200"
            value={promptInput}
            onChangeText={(e) => setPromptInput(e)}
            suffix={
              <Icon
                name="keyboard-voice"
                color="gray200"
                fontFamily="MaterialIcons"
                fontSize={25}
              />
            }
          />
          <Div flex={2}>
            <Button
              h={56}
              w={60}
              rounded="circle"
              ml={10}
              bg="transparent"
              onPress={() => handleGenerate()}
            >
              <Icon
                name="send"
                fontFamily="MaterialCommunityIcons"
                fontSize={30}
                color={promptInput ? "blue500" : "white"}
              />
            </Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
