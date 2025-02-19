import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Select, MenuItem } from "@mui/material";
import axios from "axios";
import socket from "../socket"; // Adjust path based on your structure

const CodeEditor = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username =
    new URLSearchParams(location.search).get("username") || "Anonymous";

  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", { roomId, username });

    socket.on("codeChange", ({ code: newCode }) => setCode(newCode));
    socket.on("USERS", (userList) =>
      setUsers(userList.split(",").filter(Boolean))
    );

    return () => {
      socket.off("codeChange");
      socket.off("USERS");
      socket.disconnect();
    };
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const handleRunCode = async () => {
    setOutput("Running...");

    try {
      const response = await axios.post("http://localhost:5003/execute", {
        language,
        code,
      });
      setOutput(response.data.output);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setOutput("Error running code.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-full">
        {/* Users List */}
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

        {/* Code Editor */}
        <div className="flex-1 flex flex-col bg-gray-900">
          <div className="flex items-center justify-between p-4 bg-gray-800">
            {/* Language Selector */}
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-black"
              size="small"
            >
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
            </Select>

            {/* Run Code Button */}
            <Button
              variant="contained"
              color="success"
              onClick={handleRunCode}
              size="small"
            >
              Run Code
            </Button>
          </div>

          <Editor
            height="75vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
          />

          {/* Output Panel */}
          <div className="bg-black text-white p-4 h-24">
            <h3 className="text-lg font-semibold">Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
