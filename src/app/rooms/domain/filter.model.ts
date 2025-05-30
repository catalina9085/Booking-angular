export class Filter{
  amenities:string[]=[];
  available:boolean|null=null;//afisare pe cele available/not available sau ambele
  date:string=new Date().toISOString().split('T')[0];
}
