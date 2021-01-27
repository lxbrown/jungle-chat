import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (...args: any[]) => {
  const { current: socket } = useRef(io(...args));
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  
  return [socket];
};

export default useSocket;