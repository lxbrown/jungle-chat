import { useEffect, useState } from "react";

import { Channel } from '../interfaces';

import { socket } from '../services/socket';

const JOIN_LAUNCH_EVENT = "launch:join";
const LEAVE_LAUNCH_EVENT = "launch:leave";
const CHANNEL_UPDATE_EVENT = "launch:update";

const useLaunch = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    socket.emit(JOIN_LAUNCH_EVENT);

    socket.on(CHANNEL_UPDATE_EVENT, (allChannels: Channel[]) => {
      setChannels(allChannels);
    });
    
    return () => {
      socket.emit(LEAVE_LAUNCH_EVENT);
    };
  }, []);

  return { channels };
};

export default useLaunch;