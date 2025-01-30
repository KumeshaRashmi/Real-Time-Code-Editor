import { useState } from "react";

const RoomForm = ({ joinRoom }) => {
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim()) {
      joinRoom(room);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default RoomForm;
