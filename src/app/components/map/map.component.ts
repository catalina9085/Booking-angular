import {Component, effect, input, signal} from '@angular/core';
import {GoogleMap, MapMarker} from "@angular/google-maps";
import {Location} from '../../rooms/domain/location.model';

@Component({
  selector: 'app-map',
    imports: [
        GoogleMap,
        MapMarker
    ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  location=input<Location>(new Location());
  center=signal<{lat:number,lng:number}>({lat:0,lng:0});
  markerPosition=signal(this.center());
  zoom = 15;

  constructor(){
    effect(() => {
      this.center.set({lat:this.location().lat,lng:this.location().lng});
      this.markerPosition.set(this.center());
    });

  }
}
