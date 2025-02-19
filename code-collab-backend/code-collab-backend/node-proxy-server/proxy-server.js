


// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: ["http://192.168.204.248:5173","http://192.168.204.247:5173","http://192.168.204.121:5173"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   },
// });

// const rooms = {};

// io.on("connection", (socket) => {
//   console.log("New WebSocket connection");

//   // Handle joining a room
//   socket.on("joinRoom", ({ roomId, username }) => {
//     socket.join(roomId);
//     socket.username = username; // Attach the username to the socket
//     socket.roomId = roomId; // Attach the roomId to the socket

//     if (!rooms[roomId]) {
//       rooms[roomId] = new Set();
//     }
//     rooms[roomId].add(username);

//     // Broadcast the updated user list to all users in the room
//     io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
//     console.log(`${username} joined room ${roomId}`);
//   });

//   // Handle code changes
//   socket.on("codeChange", ({ roomId, code }) => {
//     // Broadcast the code change to all users in the room
//     io.to(roomId).emit("codeChange", { code, username: socket.username });
//     console.log(`Code change in room ${roomId} by ${socket.username}: ${code}`);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     const roomId = socket.roomId;
//     const username = socket.username;

//     if (roomId && username) {
//       if (rooms[roomId]) {
//         rooms[roomId].delete(username);

//         // Broadcast the updated user list to all users in the room
//         io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
//         console.log(`${username} left room ${roomId}`);

//         // Clean up the room if it's empty
//         if (rooms[roomId].size === 0) {
//           delete rooms[roomId];
//           console.log(`Room ${roomId} is empty and has been removed.`);
//         }
//       }
//     }
//   });
// });

// server.listen(5000, () => {
//   console.log("Proxy server listening on port 5000");
// });




const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://192.168.204.248:5173",
      "http://192.168.204.247:5173",
      "http://192.168.204.121:5173",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const rooms = {};

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Handle joining a room
  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    if (!rooms[roomId]) {
      rooms[roomId] = new Set();
    }
    rooms[roomId].add(username);

    io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
    console.log(`${username} joined room ${roomId}`);
  });

  // Handle code changes
  socket.on("codeChange", ({ roomId, code }) => {
    io.to(roomId).emit("codeChange", { code, username: socket.username });
    console.log(`Code change in room ${roomId} by ${socket.username}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const { roomId, username } = socket;

    if (roomId && username && rooms[roomId]) {
      rooms[roomId].delete(username);
      io.to(roomId).emit("USERS", Array.from(rooms[roomId]).join(","));
      console.log(`${username} left room ${roomId}`);

      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} is empty and has been removed.`);
      }
    }
  });
});

// Code Execution API
app.post("/execute", (req, res) => {
  const { language, code } = req.body;
  let command;

  if (language === "javascript") {
    command = `node -e "${code.replace(/"/g, '\\"')}"`;
  } else if (language === "python") {
    command = `python -c "${code.replace(/"/g, '\\"')}"`;
  } else if (language === "cpp") {
    fs.writeFileSync("temp.cpp", code);
    command = "g++ temp.cpp -o temp.out && ./temp.out";
  } else {
    return res.json({ output: "Unsupported language." });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) return res.json({ output: stderr || error.message });
    res.json({ output: stdout });
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
