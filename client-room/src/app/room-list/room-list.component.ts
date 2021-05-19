import { RoomDetailsComponent } from 'src/app/room-details/room-details.component';
import { Observable } from "rxjs";
import { RoomService } from "../room.service";
import { Room } from "../room";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from '@angular/router';
import { RoomFilter } from '../room-filter';
import { SortableHeaderDirective, SortEvent} from './sortable.directive';

@Component({
  selector: "app-room-list",
  templateUrl: "./room-list.component.html",
  styleUrls: ["./room-list.component.css"]
})
export class RoomListComponent implements OnInit {
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  filter = new RoomFilter();
  selectedRoom: Room;
  feedback: any = {};
  total$: Observable<number>;
  rooms: Observable<Room[]>;

  constructor (private roomService: RoomService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  search(): void {
    this.roomService.load(this.filter);
    this.total$ = this.roomService.size$;
  }

  get roomList(): Room[] {
    return this.roomService.roomList;
  }

  reloadData() {
    this.roomService.load(this.filter);
    this.rooms = this.roomService.getRoomsList(this.filter);
    this.total$ = this.roomService.size$;
  }

  onChange(pageSize: number) {
    this.filter.size = pageSize;
    this.filter.page = 0;
    this.reloadData();
  }

  onPageChange(page: number) {
    this.filter.page = page - 1;
    this.reloadData();
    this.filter.page = page;
  }

  onSort({column, direction}: SortEvent) {
    // reset other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.filter.column = column;
    this.filter.direction = direction;
    this.filter.page = 0;
    this.reloadData();
  }

  select(selected: Room): void {
    this.selectedRoom = selected;
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  roomDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateRoom(id: number){
    this.router.navigate(['update', id]);
  }
}
