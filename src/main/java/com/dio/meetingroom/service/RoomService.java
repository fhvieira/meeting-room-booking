package com.dio.meetingroom.service;

import com.dio.meetingroom.exception.ResourceNotFoundException;
import com.dio.meetingroom.model.Room;
import com.dio.meetingroom.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RoomService {

    private final RoomRepository roomRepository;

    public Page<Room> findAll(Pageable page) {
        return roomRepository.findAll(page);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room findById(Long id) throws ResourceNotFoundException {
        Room room = findRoomOrThrow(id);

        return room;
    }

    public Room updateRoom(Long id, Room room) throws ResourceNotFoundException {
        Room savedRoom = findRoomOrThrow(id);

        room.setId(id);

        return saveRoom(room);
    }

    public void deleteById(Long id) throws ResourceNotFoundException {
        Room savedRoom = findRoomOrThrow(id);

        roomRepository.deleteById(id);
    }

    private Room findRoomOrThrow(Long id) throws ResourceNotFoundException {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for the Id: " + id));
    }
}
