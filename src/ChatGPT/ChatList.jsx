import React, { useState, useEffect } from 'react';
import ChatItem from './ChatItem';
import NewChatButton from './NewChatButton';
import axios from 'axios';

const ChatList = ({ onSelect, selectedChat }) => {
  const [chats, setChats] = useState([]);
  const api_url = "https://46bm04xwgg.execute-api.us-east-1.amazonaws.com";

  useEffect(() => {
    // fetch the chats
    getChats();
  }, []);

  const getChats = async () => {
    const url = api_url+"/chats";
    const result = await axios.get(url);
    console.log(result);
    setChats(result.data.chats);
  }


  const updateChat = async (id, newName) => {
    // update the chat
    const url = api_url+"/chats/"+id
    await axios.put(url, {name: newName})

    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, name: newName } : chat
    );
    setChats(updatedChats);
  };

  const deleteChat = async (id) => {
    // delete the chat
    const url = api_url+"/chats/"+id
    await axios.delete(url);

    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
  };

  const createChat = async (name) => {
    // create the chat
    const url = api_url+"/chats";
    const result = await axios.post(url, {name: name});
    console.log(result);
    getChats();
  };

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem selected={chat.id == selectedChat?.id} key={chat.id} chat={chat} onSelect={onSelect} onUpdate={updateChat} onDelete={deleteChat} />
      ))}
      <NewChatButton onCreate={createChat} />
    </div>
  );
};

export default ChatList;
