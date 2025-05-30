import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn=signal<boolean>(false);
  constructor(private http: HttpClient) { }

  register(req:{email:string,password:string,confirmPassword:string}):Observable<any>{
    const options={responseType:'text' as 'json'};
    return this.http.post('http://localhost:8080/auth/register',req,options);
  }

  login(req:{email:string,password:string}):Observable<any>{
    return this.http.post('http://localhost:8080/auth/login',req);
  }

  parseJwtToken=()=>{
    let token=localStorage.getItem('jwtToken');
    try{
      if(token) {
        const payload=JSON.parse(atob(token.split('.')[1]));
         const role=payload?.role;
         localStorage.setItem('role',role);
         console.log(role);
      }
    }catch(err){
      console.log("Error parsing token.");
    }
  }

}
