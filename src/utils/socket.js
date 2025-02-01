// utils/socket.js
import { io } from "socket.io-client";

// Connect to WebSocket server (using a public echo server for testing)
const socket = io("wss://echo.websocket.org", {
  transports: ["websocket"],
});

export default socket;
