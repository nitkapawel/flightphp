import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  imports: [
    CommonModule
  ]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get userRole(): string | null {
    return this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }
}
