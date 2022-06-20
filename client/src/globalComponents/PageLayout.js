import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import ChatWidget from '../chat/ChatWidget';

export default function Layout() {
  const [chats, setChats] = useState([]);
  const handleShowChat = (friend) => {
    if (!chats.includes(friend)) setChats([...chats, friend]);
  };
  const handleCloseChat = (friend) => {
    setChats(chats.filter((chat) => chat != friend));
  };
  return (
    <>
      <Navbar handleShowChat={handleShowChat} />
      {chats
        ? chats.map((chat) => (
            <ChatWidget key={chat._id} friendInfo={chat} handleCloseChat={handleCloseChat} />
          ))
        : null}
      <Outlet />
    </>
  );
}
