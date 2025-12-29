import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
    template: `
    <div class="auth-container">
      <div class="auth-card glass-card">
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div class="auth-footer">
          <p>Don't have an account? <a [routerLink]="['/register']" class="auth-link">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem 1rem;
    }
    .auth-card {
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      
      h2 { 
        text-align: center; 
        margin-bottom: 2rem; 
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-main);
      }
    }
    .form-group {
      margin-bottom: 1.5rem;
      
      label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
      input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--border-color);
        border-radius: 10px;
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.2s;
        background: var(--bg-color);
        color: var(--text-main);
        
         &:focus {
           outline: none;
           border-color: var(--primary-color);
           box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15);
         }
      }
    }
    .w-100 { 
      width: 100%; 
      padding: 12px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 10px;
      transition: all 0.2s;
      
       &:hover {
         transform: translateY(-2px);
         box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
       }
    }
    .auth-footer {
      margin-top: 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
      
      p {
        margin: 0;
      }
      
      .auth-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s;
        margin-left: 0.25rem;
        
        &:hover {
          color: var(--secondary-color);
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 768px) {
      .auth-container {
        padding: 1rem;
        min-height: 70vh;
      }
      .auth-card {
        padding: 2rem 1.5rem;
        
        h2 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
        }
      }
      .form-group {
        margin-bottom: 1.25rem;
      }
    }
  `]
})
export class LoginComponent {
    email = '';
    password = '';

    authService = inject(AuthService);
    router = inject(Router);

    onSubmit() {
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (err) => alert('Login Failed')
        });
    }
}
