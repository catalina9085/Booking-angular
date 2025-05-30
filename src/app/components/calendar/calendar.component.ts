import {Component, effect, input, signal} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import {RoomsService} from '../../rooms/services/rooms.service';
import {Room} from '../../rooms/domain/room.model';

@Component({
  selector: 'app-calendar',
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  room=input<Room>(new Room());
  events=signal<{title:string,start:string,end:string,color:string}[]>([]);

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    plugins: [timeGridPlugin],
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    events: [],
    height:'auto',
  };

  constructor(private roomsService:RoomsService){
    effect(() => {
        this.roomsService.getBookings(this.room().id).subscribe(bookings => {
          this.calendarOptions.events = bookings.map(b => ({
            title: b.group.name,
            start: `${b.date}T${b.startTime}`,
            end: `${b.date}T${b.endTime}`,
            color: 'gray',
          }));
        });
    });
  }
}
