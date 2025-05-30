import {Component, effect, inject, input} from '@angular/core';
import {BookingService} from '../booking.service';
import {FormsModule, NgForm} from '@angular/forms';
import {RoomsService} from '../../rooms/services/rooms.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {RoomCardComponent} from '../../rooms/room-card/room-card.component';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {bookingFormStore} from './+store/booking-form.store';

@Component({
  selector: 'app-booking-form',
  imports: [
    FormsModule,
    RoomCardComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelect,
    MatOption,
    CalendarComponent,
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
  providers: [bookingFormStore]
})
export class BookingFormComponent {
  roomId=input<number>(-1);
  bookingId=input<number>(-1);

  store =inject(bookingFormStore);
  room=this.store.room;
  bookingRequest=this.store.bookingRequest;
  namedGroups=this.store.namedGroups;

  constructor(private bookingService:BookingService,private roomService:RoomsService){
    effect(()=>{
      this.store.updateBookingId(this.bookingId());
      this.store.updateRoomId(this.roomId());
    })
  }

  onSubmit(bookingForm: NgForm) {
   this.store.submitBooking(bookingForm);
  }

  dateChanged($event: any) {
    this.store.updateBookingRequest({...this.bookingRequest(),date:$event.toLocaleDateString('sv-SE')});
  }

  endTimeChanged($event: any) {
    this.store.updateBookingRequest({...this.bookingRequest(),endTime:$event});
  }

  groupChanged($event: string) {
    if($event=='new') this.store.setShowNewGroup(true);
    else
      this.store.updateBookingRequest({...this.bookingRequest(),namedGroup:$event});
  }

  startTimeChanged($event: any) {
    this.store.updateBookingRequest({...this.bookingRequest(),startTime:$event});
  }

  newGroupSizeChanged($event: any) {
    this.store.updateBookingRequest({...this.bookingRequest(),size:$event});
  }

  newGroupNameChanged($event: any) {
    this.store.updateBookingRequest({...this.bookingRequest(),namedGroup:$event});
  }

}
