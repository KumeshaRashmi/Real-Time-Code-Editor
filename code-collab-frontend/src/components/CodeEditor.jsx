// // import { useState, useEffect } from "react";
// // import { useParams, useLocation } from "react-router-dom";
// // import { Editor } from "@monaco-editor/react";
// // import { io } from "socket.io-client";

// // const CodeEditor = () => {
// //   const { roomId } = useParams(); // Get roomId from the URL
// //   const location = useLocation();
// //   const username = new URLSearchParams(location.search).get("username") || "Anonymous"; // Get username from query params

// //   const [code, setCode] = useState("// Start coding...");
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     // Connect to the socket for the specific room
// //     const socket = io("http://localhost:8080", {
// //       query: { roomId, username },
// //     });

// //     // Emit the username to the server when joining
// //     socket.emit("joinRoom", { roomId, username });

// //     // Listen for code changes
// //     socket.on("codeChange", (newCode) => {
// //       setCode(newCode);
// //     });

// //     // Listen for room updates (user join/leave)
// //     socket.on("roomUpdate", (updatedUsers) => {
// //       setUsers(updatedUsers);
// //     });

// //     // Cleanup on component unmount
// //     return () => {
// //       socket.disconnect(); // Disconnect from the socket when the component is unmounted
// //     };
// //   }, [roomId, username]);

// //   const handleCodeChange = (newCode) => {
// //     setCode(newCode);
// //     const socket = io("http://localhost:8080");
// //     socket.emit("codeChange", { roomId, code: newCode }); // Emit the updated code to the room
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* Display the code editor */}
// //       <div className="flex h-full">
// //         {/* Left-side panel for users */}
// //         <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
// //           <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
// //           <ul className="list-none p-0 mt-4">
// //             {users.length > 0 ? (
// //               users.map((user, index) => (
// //                 <li key={index} className="py-1">{user}</li>
// //               ))
// //             ) : (
// //               <li className="py-1">No users in the room yet</li>
// //             )}
// //           </ul>
// //         </div>

// //         {/* Editor */}
// //         <div className="flex-1 bg-gray-900">
// //           <Editor
// //             height="100vh"
// //             defaultLanguage="javascript"
// //             theme="vs-dark"
// //             value={code}
// //             onChange={handleCodeChange}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodeEditor;

// // import { Editor } from "@monaco-editor/react";
// // import { useEffect, useState } from "react";
// // import { useLocation, useParams } from "react-router-dom";
// // import { io } from "socket.io-client";

// // const CodeEditor = () => {
// //   const { roomId } = useParams(); // Get roomId from the URL
// //   const location = useLocation();
// //   const username =
// //     new URLSearchParams(location.search).get("username") || "Anonymous"; // Get username from query params

// //   const [code, setCode] = useState("// Start coding...");
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     // Connect to the WebSocket proxy server
// //     const socket = io("http://localhost:5000", {
// //       query: { roomId, username },
// //     });

// //     // Emit the username to the server when joining
// //     socket.emit("joinRoom", { roomId, username });

// //     // Listen for code changes
// //     socket.on("codeChange", (newCode) => {
// //       setCode(newCode.code); // Update the editor with new code
// //     });

// //     // Cleanup on component unmount
// //     return () => {
// //       socket.disconnect(); // Disconnect from the WebSocket proxy server
// //     };
// //   }, [roomId, username]);

// //   const handleCodeChange = (newCode) => {
// //     setCode(newCode);
// //     const socket = io("http://localhost:5000");
// //     socket.emit("codeChange", { roomId, code: newCode }); // Emit the updated code to the WebSocket proxy server
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* Display the code editor */}
// //       <div className="flex h-full">
// //         {/* Left-side panel for users */}
// //         <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
// //           <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
// //           <ul className="list-none p-0 mt-4">
// //             {users.length > 0 ? (
// //               users.map((user, index) => (
// //                 <li key={index} className="py-1">
// //                   {user}
// //                 </li>
// //               ))
// //             ) : (
// //               <li className="py-1">No users in the room yet</li>
// //             )}
// //           </ul>
// //         </div>

// //         {/* Editor */}
// //         <div className="flex-1 bg-gray-900">
// //           <Editor
// //             height="100vh"
// //             defaultLanguage="javascript"
// //             theme="vs-dark"
// //             value={code}
// //             onChange={handleCodeChange}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodeEditor;

// // import { Editor } from "@monaco-editor/react";
// // import { useEffect, useState } from "react";
// // import { useLocation, useParams } from "react-router-dom";
// // import { io } from "socket.io-client";

// // const CodeEditor = () => {
// //   const { roomId } = useParams();
// //   const location = useLocation();
// //   const username =
// //     new URLSearchParams(location.search).get("username") || "Anonymous";
// //   const [code, setCode] = useState("// Start coding...");
// //   const [users, setUsers] = useState([]);
// //   const socket = io("http://localhost:5000", { query: { roomId, username } });

// //   useEffect(() => {
// //     // Emit the username to the server when joining
// //     socket.emit("joinRoom", { roomId, username });

// //     // Listen for code changes
// //     socket.on("codeChange", (newCode) => {
// //       setCode(newCode.code);
// //     });

// //     // Cleanup on component unmount
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [roomId, username]);

// //   const handleCodeChange = (newCode) => {
// //     setCode(newCode);
// //     socket.emit("codeChange", { roomId, code: newCode });
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       <div className="flex h-full">
// //         <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
// //           <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
// //           <ul className="list-none p-0 mt-4">
// //             {users.length > 0 ? (
// //               users.map((user, index) => (
// //                 <li key={index} className="py-1">
// //                   {user}
// //                 </li>
// //               ))
// //             ) : (
// //               <li className="py-1">No users in the room yet</li>
// //             )}
// //           </ul>
// //         </div>
// //         <div className="flex-1 bg-gray-900">
// //           <Editor
// //             height="100vh"
// //             defaultLanguage="javascript"
// //             theme="vs-dark"
// //             value={code}
// //             onChange={handleCodeChange}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodeEditor;

// import { Editor } from "@monaco-editor/react";
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { io } from "socket.io-client";

// const CodeEditor = () => {
//   const { roomId } = useParams();
//   const location = useLocation();
//   const username =
//     new URLSearchParams(location.search).get("username") || "Anonymous";
//   const [code, setCode] = useState("// Start coding...");
//   const [users, setUsers] = useState([]);
//   const socket = io("http://localhost:5000", { query: { roomId, username } });

//   useEffect(() => {
//     // Emit the username to the server when joining
//     socket.emit("joinRoom", { roomId, username });

//     // Listen for code changes
//     socket.on("codeChange", (newCode) => {
//       console.log("Received code change:", newCode);
//       setCode(newCode); // Update the code state with the new code
//     });

//     // Listen for user list updates
//     socket.on("USERS", (userList) => {
//       setUsers(userList.split(",").filter(Boolean)); // Update the users state
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId, username]);

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("codeChange", { code: newCode }); // Send the new code to the server
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex h-full">
//         <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
//           <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
//           <ul className="list-none p-0 mt-4">
//             {users.length > 0 ? (
//               users.map((user, index) => (
//                 <li key={index} className="py-1">
//                   {user}
//                 </li>
//               ))
//             ) : (
//               <li className="py-1">No users in the room yet</li>
//             )}
//           </ul>
//         </div>
//         <div className="flex-1 bg-gray-900">
//           <Editor
//             height="100vh"
//             defaultLanguage="javascript"
//             theme="vs-dark"
//             value={code}
//             onChange={handleCodeChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;

import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import socket from "../socket"; // Adjust path based on your file structure


const CodeEditor = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username =
    new URLSearchParams(location.search).get("username") || "Anonymous";
  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);


  useEffect(() => {
    // Emit the username to the server when joining
    socket.connect(); // Connect the socket
    socket.emit("joinRoom", { roomId, username });

    // Listen for code changes
    socket.on("codeChange", ({ code: newCode, username: changeUsername }) => {
      console.log(`Received code change from ${changeUsername}:`, newCode);
      setCode(newCode); // Update the code state with the new code
    });

    // Listen for user list updates
    socket.on("USERS", (userList) => {
      setUsers(userList.split(",").filter(Boolean)); // Update the users state
    });

    // Cleanup on component unmount
    return () => {
      socket.off("codeChange");
      socket.off("USERS");
      socket.disconnect();
    };
    
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode }); // Send the new code to the server
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-full">
        <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
          <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
          <ul className="list-none p-0 mt-4">
            {users.length > 0 ? (
              users.map((user, index) => (
                <li key={index} className="py-1">
                  {user}
                </li>
              ))
            ) : (
              <li className="py-1">No users in the room yet</li>
            )}
          </ul>
        </div>
        <div className="flex-1 bg-gray-900">
          <Editor
            height="100vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
