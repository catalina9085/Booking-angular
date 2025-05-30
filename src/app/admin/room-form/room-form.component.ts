import {Component, effect, inject, input} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import MapMouseEvent = google.maps.MapMouseEvent;
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {roomFormStore} from './+store/room-form.store';
import {MatOption, MatSelect} from '@angular/material/select';
@Component({
  selector: 'app-room-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    GoogleMapsModule,
    MatInputModule,
    MatButtonModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css',
  providers: [roomFormStore]
})
export class RoomFormComponent {
  roomId=input<number>(-1);

  store=inject(roomFormStore);
  room=this.store.room;

  constructor() {
    effect(()=>{
      this.store.updateRoomId(this.roomId());
    });
  }

  async onSubmit(roomForm: NgForm) {
    this.store.submitRoom(roomForm);
  }

  mapClicked(event: MapMouseEvent) {
    this.store.handleMapClick(event);
  }

  get amenities() {
    return this.room().amenities.join(',');
  }

  nameChanged(name: string) {
    this.store.updateRoom({...this.room(),name:name});
  }

  cityChanged(city: string) {
    this.store.updateRoom({...this.room(),location:{...this.room().location,city:city}});
  }

  streetChanged(street: string) {
    this.store.updateRoom({...this.room(),location:{...this.room().location,street:street}});
  }

  buildingChanged(building: string) {
    this.store.updateRoom({...this.room(),location:{...this.room().location,building:building}});
  }

  capacityChanged(capacity: number) {
    this.store.updateRoom({...this.room(),capacity:capacity});
  }

  amenitiesChanged(amenities:string){
    this.store.updateRoom({...this.room(),amenities:amenities.split(',')});
  }
  selectAmenitiesChanged(selected: string[]) {
    this.store.updateSelectedAmenities(selected);
  }
}
