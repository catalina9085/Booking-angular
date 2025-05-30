import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {Booking} from '../../domain/booking.model';
import {Room} from '../../../rooms/domain/room.model';
import {BookingService} from '../../booking.service';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, of, pipe, switchMap, tap} from 'rxjs';
import {RoomsService} from '../../../rooms/services/rooms.service';
import {BookingRequest} from '../../domain/bookingRequest.model';
import {NgForm} from '@angular/forms';
import {Group} from '../../../rooms/domain/group.model';

export const bookingFormStore = signalStore(
  withState({
    errorMessage:'',
    successMessage:'',
    roomId:null as number|null,
    bookingId:null as number|null,
    booking:new Booking(),
    room:new Room(),
    bookingRequest:new BookingRequest(),
    namedGroups:[] as Group[],
    showNewGroup:false
  }),
  withMethods((state,bookingService=inject(BookingService),roomService=inject(RoomsService))=>({
    loadBooking:rxMethod<number|null>(
      pipe(
        switchMap(bookingId=>{
          if(bookingId) return bookingService.getBooking(bookingId)
          return of(new Booking());
        }),
        tap(booking=>patchState(state, {booking:booking,bookingRequest:new BookingRequest(booking)}))
    )),
    loadRoom:rxMethod<number|null>(
      pipe(
        switchMap(roomId=>{
          if(roomId) return roomService.getRoom(roomId)
          return of(new Room());
        }),
        tap(room=>patchState(state,{room:room,bookingRequest:{...state.bookingRequest(),roomId:room.id}}))
      )
    ),
    loadGroups:rxMethod<void>(
      pipe(
        switchMap(()=>bookingService.getGroups()),
        tap(groups=>patchState(state,{namedGroups:groups}))
      )
    ),
    updateRoomId:(roomId:number|null)=>{
      patchState(state,{roomId:roomId});
    },
    updateBookingId:(bookingId:number|null)=>{
      patchState(state,{bookingId:bookingId});
    },
    setShowNewGroup:(showNewGroup:boolean)=>{patchState(state,{showNewGroup:showNewGroup})},
    submitBooking: rxMethod<NgForm>(
      pipe(
        switchMap(form => {
          if (!form.valid) return of(null);
          return bookingService.saveBooking(state.bookingRequest(),state.bookingId());
        }),
        tap(res=>{patchState(state,{successMessage:'Booking saved successfully!',errorMessage:''})}),
        catchError(err=>{patchState(state,{errorMessage:err.error,successMessage:''});return of(null)})
    )
    ),
    updateBookingRequest:(bookingRequest:BookingRequest)=>{
      patchState(state,{bookingRequest:bookingRequest});
    }
  })),
  withHooks({
    onInit(store){
      store.loadRoom(store.roomId);
      store.loadBooking(store.bookingId);
      store.loadGroups();
    }
  })
);
