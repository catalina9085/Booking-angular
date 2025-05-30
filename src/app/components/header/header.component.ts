import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  role=signal<string>(localStorage.getItem('role') || 'ROLE_USER');

  constructor(private router:Router){}
  logout(){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
