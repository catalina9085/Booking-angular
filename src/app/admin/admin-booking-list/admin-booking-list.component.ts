import {AfterViewInit, Component, effect, signal, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort,MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {Booking} from '../../bookings/domain/booking.model';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-admin-booking-list',
    imports: [
      MatTableModule,
      MatPaginatorModule,
      MatSortModule
    ],
  templateUrl: './admin-booking-list.component.html',
  styleUrl: './admin-booking-list.component.css'
})
export class AdminBookingListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  bookings=signal<Booking[]>([]);

  readonly columns = ['roomName','userEmail','group','date','time'];
  readonly dataSource = new MatTableDataSource<Booking>();

  constructor(private adminService:AdminService){
    this.adminService.getBookings().subscribe(bookings => {this.bookings.set(bookings);console.log(this.bookings());});
    effect(() => {
      this.dataSource.data = this.bookings();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
