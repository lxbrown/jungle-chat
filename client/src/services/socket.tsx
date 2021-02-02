import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "";

export const socket: Socket = io(SOCKET_SERVER_URL);