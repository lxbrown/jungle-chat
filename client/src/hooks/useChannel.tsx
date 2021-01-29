import { useEffect, useState } from "react";

import { Channel } from '../interfaces';

import { socket } from '../services/socket';

const CHANNEL_UPDATE_EVENT = "channel:update";

const useChannel = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    console.log('useChannel:effect - adding channel listener');

    socket.on(CHANNEL_UPDATE_EVENT, (allChannels: Channel[]) => {
      setChannels(allChannels);
    });
    
    return () => {
      console.log('useChannel:effect - disconnecting');
    };
  });

  return { channels };
};

export default useChannel;