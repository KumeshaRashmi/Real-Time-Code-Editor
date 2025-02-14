package com.codecollab.server;


import com.codecollab.model.User;
import java.util.ArrayList;
import java.util.List;

public class Room {
    private String roomId;
    private List<User> users;
    private String code;

    public Room(String roomId) {
        this.roomId = roomId;
        this.users = new ArrayList<>();
        this.code = "// Start coding...";
    }

    public String getRoomId() {
        return roomId;
    }

    public List<User> getUsers() {
        return users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void addUser(User user) {
        users.add(user);
    }

    public void removeUser(User user) {
        users.remove(user);
    }
}