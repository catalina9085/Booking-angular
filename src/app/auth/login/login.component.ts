import {Component, input, model, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest=signal<{email: string, password: string}>({email:'',password:''});
  message=model<string>('');
  errorMessage=signal<string>('');

  constructor(private authService:AuthService,private router:Router){}

  onSubmit(form:NgForm){
    if(form.valid) {
      this.authService.login(this.loginRequest()).subscribe(
        response => {
          localStorage.setItem("jwtToken",response.jwtToken);
          this.authService.isLoggedIn.set(true);
          this.authService.parseJwtToken();
          this.router.navigate(['/home']);
        },
        err=>{this.errorMessage.set(err.error);this.message.set('');}
      );
    }
  }

  emailChanged(email:string) {
    this.loginRequest.update(current=>{
      return {...current,email:email};
    })
  }

  passwordChanged(password:string) {
    this.loginRequest.update(current=>{
      return {...current,password:password};
    })
  }

}
