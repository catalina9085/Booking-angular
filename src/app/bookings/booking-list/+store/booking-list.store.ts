import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {Booking} from '../../domain/booking.model';
import {inject} from '@angular/core';
import {BookingService} from '../../booking.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, of, pipe, switchMap, tap} from 'rxjs';

export const bookingListStore =  signalStore(
  withState({
    errorMessage:'',
    successMessage:'',
    bookings:[] as Booking[],
    currentBooking:new Booking(),
  }),
  withMethods((state,bookingService=inject(BookingService))=>({
    loadBookings:rxMethod<void>(
      pipe(
        switchMap(()=>bookingService.getBookings()),
        tap(bookings=>patchState(state,{bookings:bookings}))
      )
    ),
    updateCurrentBooking:(booking:Booking)=>{
      patchState(state,{currentBooking:booking});
    },
  })),
  withMethods((state,bookingService=inject(BookingService))=>({
    cancelBooking:rxMethod<number>(
      pipe(
        switchMap(bookingId=>bookingService.cancelBooking(bookingId)),
        tap(res=>{
          state.loadBookings();
          patchState(state,{successMessage:'Booking canceled successfully!',errorMessage:''})
        }),
        catchError(err=>{
          patchState(state,{errorMessage:err.error,successMessage:''});
          return of(null);
        })
      )
    ),
  })),
  withHooks({
    onInit(store){
      store.loadBookings();
    }
  })
)
