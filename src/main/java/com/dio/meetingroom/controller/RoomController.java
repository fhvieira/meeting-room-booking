package com.dio.meetingroom.controller;

import com.dio.meetingroom.exception.ResourceNotFoundException;
import com.dio.meetingroom.model.Room;
import com.dio.meetingroom.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public Page<Room> findAll(@RequestParam(value = "name", required = false) String name, Pageable page) {
        if (name == null) {
            return roomService.findAll(page);
        }
        return roomService.findAllByName(name, page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> findById(@PathVariable Long id) throws ResourceNotFoundException {
        Room room = roomService.findById(id);

        return ResponseEntity.ok().body(room);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Room createRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @Valid @RequestBody Room room) throws ResourceNotFoundException {
        Room updatedRoom = roomService.updateRoom(id, room);

        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteRoom(@PathVariable Long id) throws ResourceNotFoundException{
        roomService.deleteById(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
