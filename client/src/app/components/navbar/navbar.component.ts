import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  template: `
    <nav class="navbar">
      <div class="container navbar-content">
        <a routerLink="/" class="logo">Job<span>Portal</span></a>
        
        <div class="nav-links">
          <a routerLink="/jobs" routerLinkActive="active">Find Jobs</a>
          <a *ngIf="isEmployer()" routerLink="/post-job" routerLinkActive="active">Post Job</a>
          <a *ngIf="isAuthenticated()" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        </div>

        <div class="auth-buttons">
          <ng-container *ngIf="authService.currentUser$ | async as user; else loginBtn">
            <span class="welcome-text">Hi, {{ user.name }}</span>
            <button (click)="logout()" class="btn btn-outline">Logout</button>
          </ng-container>
          <ng-template #loginBtn>
            <a routerLink="/login" class="btn btn-primary">Login</a>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: rgba(10, 14, 39, 0.9);
      backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      letter-spacing: -0.03em;
      
      span { 
        background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      &::before {
        content: '';
        width: 30px;
        height: 30px;
        background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
        border-radius: 9px;
        transform: rotate(-10deg);
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
      }
    }

    .nav-links {
      display: flex;
      gap: 3rem;

      a {
        font-weight: 500;
        color: rgba(255,255,255,0.6);
        font-size: 0.95rem;
        position: relative;
        transition: color 0.3s;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        &:hover::after, &.active::after {
          width: 20px;
        }

        &:hover, &.active {
          color: #fff;
        }
      }
    }

    .auth-buttons {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .welcome-text {
      font-weight: 600;
      color: #fff;
      font-size: 0.9rem;
    }

    .btn {
       padding: 8px 18px;
       font-size: 0.9rem;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isEmployer() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'employer';
  }
}
