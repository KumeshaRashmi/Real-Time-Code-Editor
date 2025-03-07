package com.codecollab.server;


import java.util.ArrayList;
import java.util.List;

import com.codecollab.model.User;

public class Room {
    private String roomId;
    private List<User> users;
    private String code;
    private String language; 
    private String lastOutput; 

    public Room(String roomId) {
        this.roomId = roomId;
        this.users = new ArrayList<>();
        this.code = "// Start coding...";
        this.language = "Java"; // Default language
        this.lastOutput = "";
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
    public void setLanguage(String language) {
        this.language = language;
        broadcastLanguageChange();
    }

    public String getLanguage() {
        return language;
    }

    public void setLastOutput(String output) {
        this.lastOutput = output;
        broadcastOutput();
    }

    public String getLastOutput() {
        return lastOutput;
    }


    private void broadcastLanguageChange() {
        String message = "LANGUAGE:" + language;
        for (User user : users) {
            user.getClientOutputStream().println(message);
        }
    }

    private void broadcastOutput() {
        String message = "OUTPUT:" + lastOutput;
        for (User user : users) {
            user.getClientOutputStream().println(message);
        }
    }
}