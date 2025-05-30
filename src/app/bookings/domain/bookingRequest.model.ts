import {Booking} from './booking.model';

export class BookingRequest {
  roomId:number|null=-1;
  date:string=new Date().toISOString().split('T')[0];
  startTime:string='';
  endTime:string='';
  namedGroup:string='';
  size:number=2;


  constructor(booking?:Booking){
    if(booking) {
      this.roomId = booking.roomId;
      this.date = booking.date;
      this.startTime = booking.startTime;
      this.endTime = booking.endTime;
      this.namedGroup = booking.group.name;
      this.size = booking.group.size;
    }
  }
}
