package com.codecollab.model;


public class User {
    private String username;
    private String roomId;

    public User(String username, String roomId) {
        this.username = username;
        this.roomId = roomId;
    }

    public String getUsername() {
        return username;
    }

    public String getRoomId() {
        return roomId;
    }
}