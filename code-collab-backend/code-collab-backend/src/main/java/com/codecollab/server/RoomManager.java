package com.codecollab.server;



import java.util.HashMap;
import java.util.Map;

public class RoomManager {
    private static RoomManager instance;
    private Map<String, Room> rooms;

    private RoomManager() {
        rooms = new HashMap<>();
    }

    public static RoomManager getInstance() {
        if (instance == null) {
            instance = new RoomManager();
        }
        return instance;
    }

    public Room createRoom(String roomId) {
        Room room = new Room(roomId);
        rooms.put(roomId, room);
        return room;
    }

    public Room getRoom(String roomId) {
        return rooms.get(roomId);
    }

    public void removeRoom(String roomId) {
        rooms.remove(roomId);
    }
}