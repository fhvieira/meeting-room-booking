import { Room } from './room';
import { RoomFilter } from './room-filter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private baseUrl = 'http://localhost:8082/api/v1/rooms';
  size$ = new BehaviorSubject<number>(0);
  roomList: Room[];

  constructor(private http: HttpClient) { }

  getRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRoom(room: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, room);
  }

  updateRoom(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // getRoomsList(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`);
  // }
  
  getRoomsList(filter: RoomFilter): Observable<Room[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((response: any) => {
        this.size$.next(response.totalElements);
        return response.content;
      })
    )
  } 
}