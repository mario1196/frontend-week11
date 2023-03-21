import React, { useEffect, useState } from 'react';
import Message from './MessageItem';
import axios from 'axios';

const ChatWindow = ({chat}) => {
  // Replace the array with actual message data
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const api_url = "https://46bm04xwgg.execute-api.us-east-1.amazonaws.com";

  useEffect(() => {
    // fetch the messages
    console.log(chat);
    getMessages(chat.id)
  }, [chat])

  const getMessages = async (chat) => {
    const url = api_url+"/messages/"+chat
    const result = await axios.get(url);
    console.log(result);
    setMessages(result.data.messages);
  }


  const handleSend = async () => {
    // Implement sending the message here
   const url = api_url+"/messages"
   await axios.post(url, {content: input, chat_id: chat.id})
   getMessages(chat.id)
      
    
    setInput('');
  };

  const handleMessageUpdate = async (id, content) => {
    // Implement updating the message here
    const url = api_url+"/messages/"+id;
    await axios.put(url, {content: content});
    getMessages(chat.id);
    console.log(id, content)
  }

  const handleMessageDelete = async (id) => {
    // Implement deleting the message here
    const url = api_url+"/messages/"+id
    await axios.delete(url);
    getMessages(chat.id);
    console.log(id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} onUpdate={handleMessageUpdate} onDelete={handleMessageDelete} />
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
