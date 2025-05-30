import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../rooms/domain/group.model';
import {HttpClient} from '@angular/common/http';
import {BookingRequest} from './domain/bookingRequest.model';
import {Booking} from './domain/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("http://localhost:8080/user/groups");
  }

  saveBooking(bookingRequest:BookingRequest,bookingId:number|null) :Observable<string>{
    const options={responseType:'text' as "json"};
    if(bookingId) return this.http.post<string>(`http://localhost:8080/user/bookings/${bookingId}`,bookingRequest,options);
    return this.http.post<string>("http://localhost:8080/user/bookings",bookingRequest,options);
  }

  getBookings(){
    return this.http.get<Booking[]>("http://localhost:8080/user/bookings");
  }

  cancelBooking(id: number) {
    const options={responseType:'text' as "json"};
    return this.http.delete(`http://localhost:8080/user/bookings/${id}`,options);
  }

  downloadBookingsAsCsv() {
    const options={responseType: 'blob' as 'blob' };
    return this.http.get('http://localhost:8080/user/bookings/csv',options);
  }

  getBooking(id:number):Observable<Booking> {
    return this.http.get<Booking>(`http://localhost:8080/user/bookings/${id}`);
  }

}
