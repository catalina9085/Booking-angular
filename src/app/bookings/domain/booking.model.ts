import {Group} from '../../rooms/domain/group.model';
import {Location} from '../../rooms/domain/location.model';

export class Booking{
  id:number=-1;
  date:string=new Date().toISOString().split('T')[0];
  startTime:string='';
  endTime:string='';
  group:Group=new Group();
  userEmail:string='';
  roomName:string='';
  roomId:number=-1;
  roomLocation:Location=new Location();
}
