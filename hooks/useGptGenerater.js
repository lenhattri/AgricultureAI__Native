import { useState, useEffect } from "react";
import { OpenAI } from "openai";

const openai_api_key = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const assistant_id = process.env.EXPO_PUBLIC_ASSISTANT_ID;
console.log(openai_api_key);
console.log(assistant_id);

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

  const createThread = async (newMessage) => {
    if (!openaiClient) {
      console.log("Can't find openaiClient");
      return;
    }
    if(currentThreadId){
      return;
    }
    setIsLoading(true);
    setError(null);
    if (error) {
      console.log(error);
    }

    try {
      const { id: threadId } = await openaiClient.beta.threads.create({
        messages: [
          {
            role: "user",
            content: newMessage,
          },
        ],
      });
      setCurrentThreadId(threadId);
      console.log("ThreadId: ", threadId);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const continueConversation = async (newMessage) => {
    console.log("Start continueConversation");
    if (!openaiClient) {
      console.log("Cant find openai client");
      return;
    }
    if(!currentThreadId){
      setIsLoading(true);
      createThread(newMessage)
    }
    const assistant = await openaiClient.beta.assistants.retrieve(assistant_id);
    setIsLoading(true);
    setError(null);

    try {
      await openaiClient.beta.threads.messages.create(currentThreadId, {
        role: "user",
        content: newMessage,
      });

      console.log("Hello");
      const { id: runId } = await openaiClient.beta.threads.runs.create(
        currentThreadId,
        {
          assistant_id: assistant.id,
        }
      );
      console.log("Before checkstatus");
      await new Promise((resolve) => {
        const checkStatus = async () => {
          const { status } = await openaiClient.beta.threads.runs.retrieve(
            currentThreadId,
            runId
          );

          if (status === "completed") {
            resolve();
          } else {
            const generatedMessages = await openaiClient.beta.threads.messages.list(
              currentThreadId
            );
            let filtedMessages = generatedMessages.data.map((message,index) => ({
              key: index,
              name:assistant.name,
              role: message.role,
              content: message.content[0].text.value
            }));
            filtedMessages = [...filtedMessages].reverse()
            filtedMessages.map(message => console.log (`${message.role} > ${message.content}`))
            
            setMessages(filtedMessages);
            setIsLoading(false)
          }
        };

        try{
          checkStatus();
        } catch(err){
          console.log(err)
        }
      });
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchThread = async () => {
    setCurrentThreadId(null);
    setMessages([]);
    createThread();
  };

  return {
    currentThreadId,
    messages,
    isLoading,
    error,
    createThread,
    continueConversation,
    switchThread,
  };
};

export default useGptGenerater;
