import { useEffect, useState } from "react";

import { Channel } from '../interfaces';

import { socket } from '../services/socket';

const JOIN_LAUNCH_EVENT = "launch:join";
const LEAVE_LAUNCH_EVENT = "launch:leave";
const CHANNEL_UPDATE_EVENT = "launch:update";

const useLaunch = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    console.log('useLaunch:effect - joining and adding listener');
    socket.emit(JOIN_LAUNCH_EVENT);

    socket.on(CHANNEL_UPDATE_EVENT, (allChannels: Channel[]) => {
      console.log('useLaunch:effect - received update');
      setChannels(allChannels);
    });
    
    return () => {
      socket.emit(LEAVE_LAUNCH_EVENT);
      console.log('useLaunch:effect - disconnecting');
    };
  }, []);

  return { channels };
};

export default useLaunch;