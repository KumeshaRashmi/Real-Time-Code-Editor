import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";

const RoomForm = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  // Handle Joining a Room
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      navigate(`/editor/${roomId}?username=${encodeURIComponent(username)}`);
    }
  };

  // Handle Creating a Room
  const handleCreateRoom = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to create room");

      const data = await response.json();
      navigate(`/editor/${data.roomId}`); // Redirect to the new room
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 6, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "gray.800", mb: 3 }}>
            Join or Create a Room
          </Typography>

          <TextField
            label="Enter Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 2, mb: 2 }}
          />

          <TextField
            label="Enter Room ID"
            variant="outlined"
            fullWidth
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 2, mb: 2 }}
          />

          <Button
            onClick={handleJoinRoom}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "blue.600", "&:hover": { backgroundColor: "blue.700" }, py: 1.5, borderRadius: 2, mb: 2 }}
          >
            Enter Room
          </Button>

          <Button
            onClick={handleCreateRoom}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "green.600", "&:hover": { backgroundColor: "green.700" }, py: 1.5, borderRadius: 2 }}
          >
            Create Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomForm;