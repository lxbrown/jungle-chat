import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export const socket: Socket = io();