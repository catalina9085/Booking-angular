import {AfterViewInit, Component, effect, inject, signal, ViewChild} from '@angular/core';
import {Booking} from '../domain/booking.model';
import {BookingService} from '../booking.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort,MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MapComponent} from '../../components/map/map.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {bookingListStore} from './+store/booking-list.store';

@Component({
  selector: 'app-booking-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MapComponent,
    MatDrawer,
    MatDrawerContent,
    MatDrawerContainer,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
  providers:[bookingListStore]
})
export class BookingListComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  readonly columns = ['roomName','group','date','time','actions'];
  readonly dataSource = new MatTableDataSource<Booking>();

  store=inject(bookingListStore);
  bookings=this.store.bookings;

  constructor(private bookingService:BookingService){
    effect(() => {
      this.dataSource.data = this.bookings();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  downloadCsv() {
    this.bookingService.downloadBookingsAsCsv().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  openMap(booking:Booking) {
    this.store.updateCurrentBooking(booking);
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }
}
