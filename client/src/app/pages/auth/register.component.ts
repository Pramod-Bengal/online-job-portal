import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="auth-container">
      <div class="auth-card glass-card">
        <h2>Create Account</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="name" name="name" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          <div class="form-group">
            <label>I am a...</label>
            <select [(ngModel)]="role" name="role">
              <option value="seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .auth-card {
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
      
      h2 { text-align: center; margin-bottom: 2rem; }
    }
    .form-group {
      margin-bottom: 1.5rem;
      
      label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
      input, select {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-family: inherit;
        
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
    }
    .w-100 { width: 100%; }
  `]
})
export class RegisterComponent {
    name = '';
    email = '';
    password = '';
    role = 'seeker';

    authService = inject(AuthService);
    router = inject(Router);

    onSubmit() {
        const user = { name: this.name, email: this.email, password: this.password, role: this.role };
        this.authService.register(user).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (err) => alert('Registration Failed')
        });
    }
}
