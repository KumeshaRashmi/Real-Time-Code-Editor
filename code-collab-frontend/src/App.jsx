import  { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import RoomForm from "./components/RoomForm";

const App = () => {
  const [roomJoined, setRoomJoined] = useState(false);

  const joinRoom = (room) => {
    console.log("Joined room:", room);
    setRoomJoined(true);
  };

  return (
    <div>
      {roomJoined ? <CodeEditor /> : <RoomForm joinRoom={joinRoom} />}
    </div>
  );
};

export default App;
