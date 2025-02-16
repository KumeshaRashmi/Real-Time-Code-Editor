

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const net = require("net");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:5173",  // Allow only your React app's origin
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   }
// });

// // Connect to the Java TCP server
// const javaTcpClient = new net.Socket();
// javaTcpClient.connect(8080, 'localhost', () => {
//   console.log('Connected to Java TCP server');
// });

// javaTcpClient.on('data', (data) => {
//   // Emit data received from Java TCP server to WebSocket clients
//   io.emit("codeChange", data.toString());
// });

// // Listen for incoming WebSocket connections from the frontend
// io.on("connection", (socket) => {
//   console.log("New WebSocket connection");

//   // When the client sends a code change, forward it to the Java TCP server
//   // socket.on("codeChange", (data) => {
//   //   javaTcpClient.write(data.code); // Send to Java server
//   //   console.log("codeChange event emitted : ", data.code);
//   // });


//   // When the client sends a code change, forward it to the Java TCP server
// socket.on("codeChange", (data) => {
//   if (data && data.code) { // Check if data and data.code are valid
//     javaTcpClient.write(data.code); // Send to Java server
//     console.log("codeChange event emitted: ", data.code);
//   } else {
//     console.error("Received invalid code change data:", data);
//   }
// });


//   socket.on("disconnect", () => {
//     console.log("WebSocket disconnected");
//   });
// });

// // Start the HTTP server and the Socket.IO server on port 5000
// server.listen(5000, () => {
//   console.log("Proxy server listening on port 5000");
// });


const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow only your React app's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Handle joining a room
  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    socket.username = username; // Attach the username to the socket
    socket.roomId = roomId; // Attach the roomId to the socket

    if (!rooms[roomId]) {
      rooms[roomId] = new Set();
    }
    rooms[roomId].add(username);

    // Broadcast the updated user list to all users in the room
    io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
    console.log(`${username} joined room ${roomId}`);
  });

  // Handle code changes
  socket.on("codeChange", ({ roomId, code }) => {
    // Broadcast the code change to all users in the room
    io.to(roomId).emit("codeChange", { code, username: socket.username });
    console.log(`Code change in room ${roomId} by ${socket.username}: ${code}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    const username = socket.username;

    if (roomId && username) {
      if (rooms[roomId]) {
        rooms[roomId].delete(username);

        // Broadcast the updated user list to all users in the room
        io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
        console.log(`${username} left room ${roomId}`);

        // Clean up the room if it's empty
        if (rooms[roomId].size === 0) {
          delete rooms[roomId];
          console.log(`Room ${roomId} is empty and has been removed.`);
        }
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Proxy server listening on port 5000");
});