import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  private authSubscription!: Subscription;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateMenuItems();
    });
    
    this.updateMenuItems();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateMenuItems() {
    console.log('Update Menu Items');
    this.items = [
      {
        label: 'Strona główna',
        icon: 'pi pi-home',
        route: '/dashboard'
      },
      {
        label: 'Artykuł',
        icon: 'pi pi-book',
        visible: this.isAuthenticated && this.userRole === 'admin',
        route: '/article'
      },
      {
        label: 'Wyloguj',
        icon: 'pi pi-sign-out',
        visible: this.isAuthenticated,
        command: () => {
          this.logout();
          this.router.navigate(['/login']);
        }
      },
      {
        label: 'Zaloguj',
        icon: 'pi pi-sign-in',
        visible: !this.isAuthenticated,
        route: '/login'
      }
    ]
  }

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
