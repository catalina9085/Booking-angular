import {Component, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerRequest=signal<{email: string, password: string,confirmPassword:string}>({email:'',password:'',confirmPassword:''});
  errorMessage=signal<string>('');
  constructor(private authService:AuthService,private router:Router){}

  onSubmit(form:NgForm):void {
    if (form.valid && this.registerRequest().password==this.registerRequest().confirmPassword) {
      this.authService.register(this.registerRequest()).subscribe(
        response => {this.router.navigate(['/login',{message: 'Registration successful. Please login.'}]);},
        err=>this.errorMessage.set(err.error)
      );
    }
  }

  emailChanged(email:string) {
    this.registerRequest.update(current=>{
      return {...current,email:email};
    })
  }

  passwordChanged(password:string) {
    this.registerRequest.update(current=>{
      return {...current,password:password};
    })
  }

  confirmPasswordChanged(confirmPassword:string) {
    this.registerRequest.update(current=>{
      return {...current,confirmPassword:confirmPassword};
    })
  }
}
