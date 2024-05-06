import { useState, useEffect } from "react";
import { OpenAI } from "openai";

const openai_api_key = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const assistant_id = process.env.EXPO_PUBLIC_ASSISTANT_ID;

const useGptGenerater = () => {
  const [openaiClient, setOpenaiClient] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createOpenaiClient = async () => {
      if (!openai_api_key) {
        setError("Missing EXPO_PUBLIC_OPENAI_API_KEY environment variable");
        return;
      }

      try {
        const client = new OpenAI({ apiKey: openai_api_key });
        setOpenaiClient(client);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    createOpenaiClient();
  }, []);

  

  const continueConversation = async (newMessage) => {
    if (!openaiClient) {
      setError("Can't find openaiClient");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      let threadId = currentThreadId;
  
      if (threadId == null) {
        const thread = await openaiClient.beta.threads.create({
          messages: [
            {
              role: "user",
              content: newMessage,
            }
          ]
        });
        threadId = thread.id;
        setCurrentThreadId(threadId);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "user",
            content: newMessage,
          }
        ]);
        console.log("ThreadId: ", threadId);
      }
  
      await openaiClient.beta.threads.messages.create(threadId, {
        role: "user",
        content: newMessage,
      });
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: newMessage,
        },
        {
          role: "assistant",
          content: "Đang tải...",
        },
      ]);
  
      const run = await openaiClient.beta.threads.runs.create(threadId, {
        assistant_id: assistant_id,
      });
  
      console.log("RunId: ", run.id);
  
      await new Promise((resolve) => {
        const checkStatus = async () => {
          const { status } = await openaiClient.beta.threads.runs.retrieve(
            threadId,
            run.id
          );
  
          if (status === "completed") {
            resolve();
          } else {
            setTimeout(checkStatus, 1000);
          }
        };
  
        checkStatus();
      });
  
      const generatedMessages = await openaiClient.beta.threads.messages.list(
        threadId
      );
  
      let filtedMessages = generatedMessages.data.map((message) => ({
        role: message.role,
        content: message.content[0].text.value,
      }));
  
      console.log(filtedMessages);
      filtedMessages = [...filtedMessages].reverse();
      filtedMessages.map((message) =>
        console.log(`${message.role} > ${message.content}`)
      );
  
      setMessages(filtedMessages);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchThread = async () => {
    setCurrentThreadId(null);
    setMessages([]);
  };

  return {
    currentThreadId,
    messages,
    isLoading,
    error,
    continueConversation,
    switchThread,
  };  
};

export default useGptGenerater;
