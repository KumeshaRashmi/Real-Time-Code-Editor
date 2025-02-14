package com.codecollab.server;


import java. io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

import com.codecollab.model.User;

public class ClientHandler implements Runnable {
    private Socket clientSocket;
    private RoomManager roomManager;
    private User user;
    private Room room;

    public ClientHandler(Socket clientSocket, RoomManager roomManager) {
        this.clientSocket = clientSocket;
        this.roomManager = roomManager;
    }

    @Override
    public void run() {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
        ) {
            // Read username and roomId from the client
            String username = in.readLine();
            String roomId = in.readLine();

            // Create or join the room
            room = roomManager.getRoom(roomId);
            if (room == null) {
                room = roomManager.createRoom(roomId);
            }

            user = new User(username, roomId);
            room.addUser(user);

            // Notify all users in the room about the new user
            broadcastUserList(room);

            // Send the current code to the new user
            out.println(room.getCode());

            // Handle code updates from the client
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                room.setCode(inputLine);
                broadcastCode(room, inputLine);
            }

            // Remove the user when they disconnect
            room.removeUser(user);
            broadcastUserList(room);

            // Clean up the room if it's empty
            if (room.getUsers().isEmpty()) {
                roomManager.removeRoom(roomId);
            }
        } catch (IOException e) {
            System.err.println("Error handling client: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                System.err.println("Error closing client socket: " + e.getMessage());
            }
        }
    }

    private void broadcastUserList(Room room) {
        StringBuilder userList = new StringBuilder("USERS:");
        for (User user : room.getUsers()) {
            userList.append(user.getUsername()).append(",");
        }
        String message = userList.toString();
        for (User user : room.getUsers()) {
            // Send the updated user list to all clients in the room
            // (Implementation of sending to clients is left as an exercise)
        }
    }

    private void broadcastCode(Room room, String code) {
        for (User user : room.getUsers()) {
            // Send the updated code to all clients in the room
            // (Implementation of sending to clients is left as an exercise)
        }
    }
}