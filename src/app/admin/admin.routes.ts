import {Routes} from '@angular/router';
import {RoomFormComponent} from './room-form/room-form.component';
import {GroupsComponent} from './groups/groups.component';
import {AdminBookingListComponent} from './admin-booking-list/admin-booking-list.component';

export const adminRoutes:Routes = [
  {path:'',redirectTo:'/admin/room',pathMatch:'full'},
  {path:'room',component:RoomFormComponent},
  {path:'room/:roomId',component:RoomFormComponent},
  {path:'group',component:GroupsComponent},
  {path:'bookings',component:AdminBookingListComponent}
];
