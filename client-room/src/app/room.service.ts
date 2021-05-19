import { Room } from './room';
import { RoomFilter } from './room-filter';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private baseUrl = 'http://localhost:8082/api/v1/rooms';
  size$ = new BehaviorSubject<number>(0);
  roomList: Room[] = [];

  constructor(private http: HttpClient) { }

  getRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  load(filter: RoomFilter): void {
    this.getRoomsList(filter).subscribe(result => {
        this.roomList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
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

  getRoomsList(filter: RoomFilter): Observable<Room[]> {
    const params: any = {
      name: filter.name,
      sort: `${filter.column},${filter.direction}`,
      size: filter.size,
      page: filter.page
    }

    if (!filter.direction) { delete params.sort; }
    if (!filter.name) { delete params.name; }

    return this.http.get(`${this.baseUrl}`, {params, headers}).pipe(
      map((response: any) => {
        this.size$.next(response.totalElements);
        return response.content;
      })
    )
  }
}
