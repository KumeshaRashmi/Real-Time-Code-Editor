package com.codecollab.server;


import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

import com.codecollab.utils.Constants;

public class Server {
    public static void main(String[] args) {
        RoomManager roomManager = RoomManager.getInstance();

        try (ServerSocket serverSocket = new ServerSocket(Constants.SERVER_PORT)) {
            System.out.println(InetAddress.getLocalHost());
            System.out.println("Server is running on port " + Constants.SERVER_PORT);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New client connected: " + clientSocket.getInetAddress());

                // Handle each client in a separate thread
                ClientHandler clientHandler = new ClientHandler(clientSocket, roomManager);
                new Thread(clientHandler).start();
            }
        } catch (IOException e) {
            System.err.println("Server error: " + e.getMessage());
        }
    }
}