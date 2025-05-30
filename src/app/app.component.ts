import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './auth/auth.service';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booking';
  //isLoggedIn=signal(false);
  constructor(public authService: AuthService) {
    //this.isLoggedIn.set(this.authService.isLoggedIn());
  }
}
