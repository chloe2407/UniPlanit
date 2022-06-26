import Navbar from 'globalComponents/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import ChatWidget from 'chat/ChatWidget';
import ErrorFallback from 'globalComponents/error';
import { ErrorBoundary } from 'react-error-boundary';
import useFeedback from 'context/feedback';

export default function Layout() {
  const [chats, setChats] = useState([]);
  const { SnackbarMsg } = useFeedback();
  const handleShowChat = (friend) => {
    if (!chats.includes(friend)) setChats([...chats, friend]);
  };
  const handleCloseChat = (friend) => {
    setChats(chats.filter((chat) => chat != friend));
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar handleShowChat={handleShowChat} />
      {chats
        ? chats.map((chat) => (
            <ChatWidget
              key={chat._id}
              friendInfo={chat}
              handleCloseChat={handleCloseChat}
            />
          ))
        : null}
      <Outlet />
      {SnackbarMsg}
    </ErrorBoundary>
  );
}
