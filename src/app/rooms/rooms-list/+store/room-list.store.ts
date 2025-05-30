import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {Room} from '../../domain/room.model';
import {Filter} from '../../domain/filter.model';
import {RoomsService} from '../../services/rooms.service';
import { inject } from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';

export const roomListStore = signalStore(
  withState({
    rooms:[] as Room[],
    filter:null as Filter |null,
    amenities:[] as string[],
    currentRoom:new Room(),
    showMap:false
  }),
  withMethods((state,roomService=inject(RoomsService))=>({
    loadRooms:rxMethod<Filter|null>(
      pipe(
        tap(filter=>console.log("Filter: "+filter)),
        switchMap(filter=>roomService.getRooms(filter)),
        tap(rooms=>patchState(state,{rooms:rooms}))
      )
    ),
    updateFilter:(filter:Filter|null)=>{
      patchState(state,{filter:filter});
    },
    updateCurrentRoom:(room:Room)=>{
      patchState(state,{currentRoom:room});
    },
    setShowMap:(showMap:boolean)=>{
      patchState(state,{showMap:showMap});
    },
    loadAmenities:rxMethod<void>(
      pipe(
        switchMap(()=>roomService.getAmenities()),
        tap(amenities=>patchState(state,{amenities:amenities}))
      )
    )
  })
  ),
  withHooks({
    onInit(store){
      store.loadRooms(store.filter);
      store.loadAmenities();
    }
  })
);
