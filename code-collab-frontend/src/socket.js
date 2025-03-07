import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Adjust if needed

// Create a singleton socket instance
const socket = io(SOCKET_SERVER_URL, { autoConnect: false });

export default socket;
