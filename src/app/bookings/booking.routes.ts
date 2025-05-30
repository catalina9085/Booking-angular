import {Routes} from '@angular/router';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {BookingListComponent} from './booking-list/booking-list.component';

export const bookingRoutes:Routes = [
  {path:'',component:BookingListComponent},
  {path:':roomId',component:BookingFormComponent},
  {path:':roomId/:bookingId',component:BookingFormComponent}
];
