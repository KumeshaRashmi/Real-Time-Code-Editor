

package com.codecollab.model;

import java.io.PrintWriter;

public class User {
    private String username;
    private String roomId;
    private PrintWriter clientOutputStream;  // This will allow communication with the client

    public User(String username, String roomId, PrintWriter clientOutputStream) {
        this.username = username;
        this.roomId = roomId;
        this.clientOutputStream = clientOutputStream;
    }

    public String getUsername() {
        return username;
    }

    public String getRoomId() {
        return roomId;
    }

    public PrintWriter getClientOutputStream() {
        return clientOutputStream;
    }
}
