import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(public authService: AuthService ) {}

}
