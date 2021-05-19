package com.dio.meetingroom.repository;

import com.dio.meetingroom.model.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    public Page<Room> findByName(String name, Pageable pageable);
}
