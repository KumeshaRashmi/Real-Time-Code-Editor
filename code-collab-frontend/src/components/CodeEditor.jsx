import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust for your backend

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding...");

  useEffect(() => {
    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("codeChange");
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", newCode);
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
