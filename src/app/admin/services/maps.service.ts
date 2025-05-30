import { Injectable } from '@angular/core';
import MapMouseEvent = google.maps.MapMouseEvent;
import {Room} from '../../rooms/domain/room.model';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  geocoder = new google.maps.Geocoder();
  constructor() { }

  public extractLocation(event:MapMouseEvent,room:Room) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      room.location.lat=lat;
      room.location.lng=lng;
      console.log('Coordonate:', lat, lng);

      this.geocoder.geocode({location: {lat, lng}}, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const address = results[0].formatted_address;
          console.log('Adresa:', address);


          const city = this.extractComponent(results[0].address_components, 'locality');
          const building = this.extractComponent(results[0].address_components, 'premise');
          const street = this.extractComponent(results[0].address_components, 'route');

          if(city) room.location.city=city;
          if(building) room.location.building=building;
          else room.location.building='';
          if(street) room.location.street = street;
          else room.location.street='';

        } else {
          console.error('Reverse geocoding failed:', status);
        }
      });
    }
    return room;
  }

  extractComponent(components: google.maps.GeocoderAddressComponent[], type: string): string | undefined {
    const comp = components.find(c => c.types.includes(type));
    return comp?.long_name;
  }

  public extractCoordinates(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {
      const parts = [];

      if (room.location.street) parts.push(room.location.street);
      if (room.location.building) parts.push(room.location.building);
      if (room.location.city) parts.push(room.location.city);

      const fullAddress = parts.join(', ');

      this.geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const location = results[0].geometry.location;
          room.location.lat = location.lat();
          room.location.lng = location.lng();
          resolve(room);
        } else {
          reject('Geocodare eșuată');
        }
      });
    });
  }
}
