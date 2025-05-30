import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Room} from '../domain/room.model';
import {Booking} from '../../bookings/domain/booking.model';
import {Filter} from '../domain/filter.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) {
  }

  public getRooms(filter:Filter|null):Observable<Room[]>{
    if(filter) return this.http.post<Room[]>("http://localhost:8080/user/rooms/filtered",filter);
    else return this.http.get<Room[]>("http://localhost:8080/user/rooms");
  }

  public getRoom(roomId:number):Observable<Room>{
    return this.http.get<Room>(`http://localhost:8080/user/rooms/${roomId}`);
  }

  public getBookings(roomId:number|null):Observable<Booking[]>{
    if(roomId)
      return this.http.get<Booking[]>(`http://localhost:8080/user/rooms/bookings/${roomId}`);
    else return of([]);
  }

  public deleteRoom(roomId:number){
    const options={responseType:'text' as 'json'};
    return this.http.delete(`http://localhost:8080/admin/rooms/${roomId}`,options)
  }

  public getAmenities():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8080/user/rooms/amenities')
  }

}
