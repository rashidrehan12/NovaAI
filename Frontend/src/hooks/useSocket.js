import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../config/api';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io(API_BASE_URL, {
      withCredentials: true,
      extraHeaders: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setSocket(newSocket);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;