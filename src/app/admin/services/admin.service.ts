import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../../rooms/domain/room.model';
import {Group} from '../../rooms/domain/group.model';
import {Observable} from 'rxjs';
import {Booking} from '../../bookings/domain/booking.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  addNewRoom(room:Room){
    const options={responseType:'text' as "json"};
    return this.http.post("http://localhost:8080/admin/rooms",room,options);
  }

  editRoom(room:Room){
    const options={responseType:'text' as "json"};
    return this.http.put("http://localhost:8080/admin/rooms",room,options);
  }

  addNewGroup(formData:FormData){
    const options={responseType:'text' as "json"};
    return this.http.post("http://localhost:8080/admin/groups",formData,options);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("http://localhost:8080/admin/groups");
  }

  getRoom(id:number):Observable<Room> {
    return this.http.get<Room>(`http://localhost:8080/user/rooms/${id}`);
  }

  getBookings():Observable<Booking[]>{
    return this.http.get<Booking[]>('http://localhost:8080/admin/bookings');
  }
}
