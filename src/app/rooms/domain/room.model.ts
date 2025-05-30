import {Location} from './location.model';

export class Room {
  id:number|null=null;
  name: string='';
  location:Location=new Location();
  capacity:number|undefined=undefined;
  amenities:string[]=[];
  available:boolean=false;
}
