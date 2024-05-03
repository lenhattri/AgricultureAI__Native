import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Div,
  Icon,
  Text,
  Input,
  Button,
  ScrollDiv,
} from "react-native-magnus";
import Message from "../../../components/Message";
import useGptGenerater from "../../../hooks/useGptGenerater";
export default function HomeScreen() {
  const [promptInput, setPromptInput] = useState("");
  const {
    currentThreadId,
    messages,
    setMessages,
    isLoading,
    error,
    continueConversation,
    switchThread,
  } = useGptGenerater();

  const handleGenerate = async () => {
    if (!isLoading) {
      console.log("start handleGenerate ");
      const currentPromptInput = promptInput;
      
      await continueConversation(currentPromptInput);
      setPromptInput()
      
    }
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
        <Div flex={6}>
          <ScrollDiv>
            {currentThreadId ? (
              messages.map((message, index) => {
                if (index < 1) {
                  return;
                }
                return (
                  <>
                    {message.role === "user" ? (
                      <Message
                        key={index}
                        username={userDetailRole.name}
                        message={message.content}
                      />
                    ) : (
                      <>
                        {message.content === "Đang tải..." ? (
                          <Text key={index} color="gray400">
                            Assistant đang nhập...
                          </Text>
                        ) : (
                          <Message
                            key={index}
                            username={assistantDetailRole.name}
                            message={message.content}
                            imageUri={assistantDetailRole.imageUri}
                          />
                        )}
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <Div flex={1} justifyContent="center" alignItems="center">
                <Text fontSize="lg" color="white">Hãy nhập tin nhắn ở dưới</Text>
              </Div>
            )}
          </ScrollDiv>
        </Div>

        <Div flex={1} row justifyContent="center" alignItems="flex-end">
          <Div flex={2}>
            <Button
              h={56}
              w={60}
              rounded="circle"
              ml={10}
              bg="transparent"
              onPress={() => switchThread()}
            >
              <Icon name="pluscircleo" fontFamily="AntDesign" fontSize={30} />
            </Button>
          </Div>

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
