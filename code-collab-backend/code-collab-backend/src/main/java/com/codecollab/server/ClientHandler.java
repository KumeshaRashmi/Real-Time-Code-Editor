

package com.codecollab.server;

import java.io.BufferedReader;
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
            System.out.println("Received connection request from user: " + username + " for room: " + roomId);

            // Create or join the room
            room = roomManager.getRoom(roomId);
            if (room == null) {
                room = roomManager.createRoom(roomId);
                System.out.println("Created new room: " + roomId);
            } else {
                System.out.println("Joined existing room: " + roomId);
            }

            // Create the user and add to the room
            user = new User(username, roomId, out);
            room.addUser(user);
            System.out.println("User " + username + " added to room: " + roomId);

            // Notify all users in the room about the new user
            broadcastUserList(room);

            // Send the current code to the new user
            out.println(room.getCode());
            System.out.println("Sent current code to user: " + username);

            // Handle code updates from the client
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Received code update from user " + username + ": " + inputLine);
                room.setCode(inputLine);
                broadcastCode(room, inputLine);
            }

            // Remove the user when they disconnect
            room.removeUser(user);
            System.out.println("User " + username + " disconnected from room: " + roomId);
            broadcastUserList(room);

            // Clean up the room if it's empty
            if (room.getUsers().isEmpty()) {
                roomManager.removeRoom(roomId);
                System.out.println("Room " + roomId + " is empty and has been removed.");
            }
        } catch (IOException e) {
            System.err.println("Error handling client: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
                System.out.println("Closed client socket for user: " + (user != null ? user.getUsername() : "unknown"));
            } catch (IOException e) {
                System.err.println("Error closing client socket: " + e.getMessage());
            }
        }
    }

    // Sends the list of users in the room to all users in the room
    private void broadcastUserList(Room room) {
        StringBuilder userList = new StringBuilder("USERS:");
        for (User user : room.getUsers()) {
            userList.append(user.getUsername()).append(",");
        }
        // Remove the trailing comma
        if (userList.length() > 0) {
            userList.setLength(userList.length() - 1);
        }

        String message = userList.toString();
        System.out.println("Broadcasting user list: " + message);

        // Send the user list to all clients in the room
        for (User user : room.getUsers()) {
            PrintWriter userOut = user.getClientOutputStream();
            if (userOut != null) {
                userOut.println(message); // Send the user list to the client
            }
        }
    }

    // Sends the updated code to all users in the room
    private void broadcastCode(Room room, String code) {
        System.out.println("Broadcasting updated code to all users in room: " + room.getRoomId());
        for (User user : room.getUsers()) {
            PrintWriter userOut = user.getClientOutputStream();
            if (userOut != null) {
                userOut.println(code); // Send the updated code to the client
            }
        }
    }
}
