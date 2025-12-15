import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.toast.show('Vous êtes déconnecté', 'success');
    void this.router.navigateByUrl('/login');
  }
}
