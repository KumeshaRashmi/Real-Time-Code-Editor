import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const RoomForm = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim()) {
      navigate(`/editor/${room}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 6, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "gray.800", mb: 3 }}>
            Join a Room
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Enter Room ID"
              variant="outlined"
              fullWidth
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "blue.600",
                "&:hover": { backgroundColor: "blue.700" },
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Join Room
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomForm;
