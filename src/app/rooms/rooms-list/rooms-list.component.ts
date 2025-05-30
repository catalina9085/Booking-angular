import {AfterViewInit, Component, effect, inject, signal, ViewChild} from '@angular/core';
import {Room} from '../domain/room.model';
import {RoomsService} from '../services/rooms.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MapComponent} from '../../components/map/map.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {Filter} from '../domain/filter.model';
import {roomListStore} from './+store/room-list.store';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {RouterLink} from '@angular/router';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FilterComponent} from '../filter/filter.component';


@Component({
  selector: 'app-rooms-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    RouterLink,
    MatDrawer,
    MatDrawerContent,
    MapComponent,
    CalendarComponent,
    MatDrawerContainer,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FilterComponent

  ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  providers:[roomListStore]
})
export class RoomsListComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  store=inject(roomListStore);
  rooms=this.store.rooms;

  readonly columns =(this.role=='ROLE_ADMIN')? ['name','location','capacity','available','amenities','actions']:['admin','name','location','capacity','available','amenities','actions'];
  readonly dataSource = new MatTableDataSource<Room>();

  constructor(private roomsService:RoomsService){
    effect(() => {
      this.dataSource.data = this.rooms();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  openMap(room:Room) {
    this.store.updateCurrentRoom(room);
    this.store.setShowMap(true);
    this.drawer.open();
  }

  openCalendar(room: Room) {
    this.store.updateCurrentRoom(room);
    this.store.setShowMap(false);
    this.drawer.open();
  }

  get role():string{
    return localStorage.getItem('role') || 'ROLE_USER';
  }


  closeDrawer() {
    this.drawer.close();
  }

  filterChanged($event: Filter | null) {
    this.store.updateFilter($event);
  }

  deleteRoom(id: number) {
    this.roomsService.deleteRoom(id).subscribe(_=>this.store.loadRooms(this.store.filter));
  }
}
