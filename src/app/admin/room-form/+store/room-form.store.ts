import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {Room} from '../../../rooms/domain/room.model';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {lastValueFrom, of, pipe, switchMap, tap} from 'rxjs';
import {AdminService} from '../../services/admin.service';
import {MapsService} from '../../services/maps.service';
import {NgForm} from '@angular/forms';
import {RoomsService} from '../../../rooms/services/rooms.service';

export const roomFormStore=signalStore(
    withState({
      room:new Room(),
      roomId:null as number|null,
      locationError:'',
      successMessage:'',
      markerPosition:{ lat: 44.4268, lng: 26.1025 },
      amenities:[] as string[],
      selectedAmenities:[] as string[]
    }),
  withMethods((state,adminService=inject(AdminService),mapsService=inject(MapsService),roomService=inject(RoomsService))=>({
      loadRoom:rxMethod<number|null>(
        pipe(
          switchMap(roomId=>{
            if(roomId) return adminService.getRoom(roomId)
            return of(new Room());
          }),
          tap(room=>patchState(state,{room:room}))
        )
      ),
    loadAmenities:rxMethod<void>(
      pipe(
        switchMap(()=>roomService.getAmenities()),
        tap(amenities=>patchState(state,{amenities:amenities}))
      )
    ),
      updateRoomId:(roomId:number|null)=>{
        patchState(state,{roomId:roomId});
      },
    updateRoom:(room:Room)=>{
        patchState(state,{room:room});
    },
    updateSelectedAmenities:(amenities:string[])=>{
    patchState(state,{selectedAmenities:amenities});
},
    handleMapClick: (event: google.maps.MapMouseEvent) => {
      const updatedRoom = mapsService.extractLocation(event, state.room());
      patchState(state, {
        room: updatedRoom,
        markerPosition: {
          lat: updatedRoom.location.lat,
          lng: updatedRoom.location.lng
        }
      });
    },
    submitRoom: rxMethod<NgForm>(
      pipe(
        switchMap(async (form) => {
          if (!form.valid) return;

          const room = {...state.room(),amenities:[...state.room().amenities,...state.selectedAmenities()]};

          if (!room.location.city) {
            patchState(state, { locationError: 'Please select a location on the map or enter the city manually.' ,successMessage:''});
            return;
          }

          let updatedRoom = room;

          if (!room.location.lat || !room.location.lng) {
            updatedRoom = await mapsService.extractCoordinates(room);
            patchState(state, { room: updatedRoom });
          }

          const roomId = state.roomId();

          try {
            if (roomId) {
              await lastValueFrom(adminService.editRoom(updatedRoom));
              patchState(state, { successMessage: 'Room updated successfully!' ,locationError:''});
            } else {
              await lastValueFrom(adminService.addNewRoom(updatedRoom));
              patchState(state, { successMessage: 'Room created successfully!',locationError:'' });
            }
            form.resetForm();
          } catch (err: any) {
            patchState(state, { locationError: err.error,successMessage:'' });
          }
        })
      )
    )

    })
  ),

  withHooks({
    onInit(store){
      store.loadRoom(store.roomId);
      store.loadAmenities();
    }
  })

)
