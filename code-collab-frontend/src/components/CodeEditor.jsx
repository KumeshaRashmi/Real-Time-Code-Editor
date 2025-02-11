// import { useState, useEffect } from "react";
// import { Editor } from "@monaco-editor/react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8080");
// const CodeEditor = () => {
//   const [code, setCode] = useState("// Start coding...");

//   useEffect(() => {
//     socket.on("codeChange", (newCode) => {
//       setCode(newCode);
//     });

//     return () => {
//       socket.off("codeChange");
//     };
//   }, []);

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("codeChange", newCode);
//   };

//   return (
//     <div style={{ height: "90vh", width: "100%" }}>
//       <Editor
//         height="100%"
//         defaultLanguage="javascript"
//         theme="vs-dark"
//         value={code}
//         onChange={handleCodeChange}
//       />
//     </div>
//   );
// };

// export default CodeEditor;

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import { io } from "socket.io-client";

const CodeEditor = () => {
  const { roomId } = useParams(); // Get roomId from the URL
  const location = useLocation();
  const username = location.state?.username || "Anonymous"; // Get username from state, default to "Anonymous"
  
  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Connect to the socket for the specific room
    const socket = io("http://localhost:8080", {
      query: { roomId },
    });

    // Emit the username to the server when joining
    socket.emit("joinRoom", { roomId, username });

    // Listen for code changes
    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });

    // Listen for room updates (user join/leave)
    socket.on("roomUpdate", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect(); // Disconnect from the socket when the component is unmounted
    };
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    const socket = io("http://localhost:8080");
    socket.emit("codeChange", newCode); // Emit the updated code to the room
  };

  return (
    <div className="flex flex-col h-full">
      {/* Display the code editor */}
      <div className="flex h-full">
        {/* Left-side panel for users */}
        <div className="w-64 bg-gray-100 p-4 border-r-2 border-gray-300">
          <h3 className="text-lg font-semibold">Users in Room: {roomId}</h3>
          <ul className="list-none p-0 mt-4">
            {users.length > 0 ? (
              users.map((user, index) => (
                <li key={index} className="py-1">{user}</li>
              ))
            ) : (
              <li className="py-1">No users in the room yet</li>
            )}
          </ul>
        </div>

        {/* Editor */}
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
