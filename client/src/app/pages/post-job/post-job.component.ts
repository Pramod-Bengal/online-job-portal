import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="post-job-container">
      <div class="container">
        <div class="form-wrapper glass-card animate-fade-up">
          <header class="form-header">
            <div class="steps-indicator">
              <div class="step" [class.active]="currentStep >= 1" [class.completed]="currentStep > 1">
                <span class="step-num">1</span>
                <span class="step-label">Role Details</span>
              </div>
              <div class="line"></div>
              <div class="step" [class.active]="currentStep >= 2" [class.completed]="currentStep > 2">
                <span class="step-num">2</span>
                <span class="step-label">Location</span>
              </div>
              <div class="line"></div>
              <div class="step" [class.active]="currentStep >= 3" [class.completed]="currentStep > 3">
                <span class="step-num">3</span>
                <span class="step-label">Finalize</span>
              </div>
            </div>
            <h1>{{ getStepTitle() }}</h1>
            <p>{{ getStepDescription() }}</p>
          </header>

          <form (ngSubmit)="onSubmit()" #jobForm="ngForm">
            <!-- Step 1: Basic Info -->
            <div *ngIf="currentStep === 1" class="step-content animate-fade-in">
              <div class="form-group">
                <label>Job Title</label>
                <input type="text" [(ngModel)]="job.title" name="title" required placeholder="e.g. Senior Product Designer">
                <small>Be specific with title to attract the right candidates.</small>
              </div>
              <div class="form-group">
                <label>Company Name</label>
                <input type="text" [(ngModel)]="job.company" name="company" required placeholder="e.g. Acme Studio">
              </div>
            </div>

            <!-- Step 2: Location & Salary -->
            <div *ngIf="currentStep === 2" class="step-content animate-fade-in">
               <div class="form-group">
                  <label>Work Location</label>
                  <div class="icon-input">
                    <input type="text" [(ngModel)]="job.location" name="location" required placeholder="e.g. London, UK or Remote">
                  </div>
               </div>
               <div class="form-group">
                  <label>Salary Range (Annual)</label>
                  <input type="text" [(ngModel)]="job.salary" name="salary" required placeholder="e.g. $120k - $160k">
               </div>
            </div>

            <!-- Step 3: Description -->
            <div *ngIf="currentStep === 3" class="step-content animate-fade-in">
              <div class="form-group">
                <label>Detailed Description</label>
                <textarea [(ngModel)]="job.description" name="description" rows="8" required placeholder="Write about the role, expectations, and benefits..."></textarea>
              </div>
            </div>

            <div class="form-navigation">
              <button type="button" *ngIf="currentStep > 1" (click)="prevStep()" class="btn btn-outline">Back</button>
              <button type="button" *ngIf="currentStep < 3" (click)="nextStep()" class="btn btn-primary" [disabled]="!isStepValid()">Next Step</button>
              <button type="submit" *ngIf="currentStep === 3" class="btn btn-primary" [disabled]="!jobForm.valid">Post Job Opportunity</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Success Overlay -->
      <div class="success-overlay" *ngIf="showSuccess">
        <div class="success-card glass-card">
          <div class="success-icon">✓</div>
          <h2>Job Posted Successfully!</h2>
          <p>Your listing is now live and visible to thousands of candidates.</p>
          <button (click)="goToJobs()" class="btn btn-primary">Go to Jobs</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-job-container { padding: 8rem 0; background: var(--bg-color); min-height: 100vh; position: relative; }
    
    .form-wrapper { max-width: 700px; margin: 0 auto; padding: 4rem; }

    .steps-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      
      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        z-index: 1;
        
        .step-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--text-muted);
          transition: all 0.3s;
        }
        
        .step-label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        
        &.active .step-num { border-color: var(--primary-color); color: var(--primary-color); box-shadow: 0 0 0 4px var(--primary-light); }
        &.completed .step-num { background: var(--primary-color); border-color: var(--primary-color); color: white; }
      }

      .line { flex: 1; height: 2px; background: var(--border-color); margin: -20px 10px 0; }
    }

    .form-header {
      text-align: center;
      margin-bottom: 3rem;
      h1 { font-size: 2rem; margin-bottom: 0.5rem; }
      p { color: var(--text-muted); }
    }

    .form-group {
      margin-bottom: 2rem;
      label { display: block; margin-bottom: 0.75rem; font-weight: 600; color: var(--text-main); font-size: 0.95rem; }
      input, textarea {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        font-family: inherit;
        font-size: 1rem;
        background: rgba(255,255,255,0.5);
        transition: all 0.2s;
        
        &:focus { outline: none; border-color: var(--primary-color); background: white; box-shadow: var(--shadow-sm); }
      }
      small { display: block; margin-top: 0.5rem; color: var(--text-muted); font-size: 0.85rem; }
    }

    .form-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      
      .btn { min-width: 140px; }
      
      @media (max-width: 600px) {
        flex-direction: column-reverse;
        gap: 1rem;
        .btn { width: 100%; }
      }
    }

    @media (max-width: 768px) {
      .form-wrapper { padding: 2rem; }
      .steps-indicator { display: none; }
      .form-header h1 { font-size: 1.5rem; }
    }

    .success-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.4s ease-out;
    }

    .success-card {
      padding: 4rem;
      text-align: center;
      max-width: 500px;
      animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      
      .success-icon {
        width: 80px; height: 80px;
        background: #C6F6D5;
        color: #2F855A;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto 2rem;
      }
      
      h2 { margin-bottom: 1rem; }
      p { color: var(--text-muted); margin-bottom: 2rem; }
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
  `]
})
export class PostJobComponent {
  currentStep = 1;
  showSuccess = false;
  job = {
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  };

  jobService = inject(JobService);
  router = inject(Router);

  nextStep() { if (this.currentStep < 3) this.currentStep++; }
  prevStep() { if (this.currentStep > 1) this.currentStep--; }

  isStepValid() {
    if (this.currentStep === 1) return this.job.title && this.job.company;
    if (this.currentStep === 2) return this.job.location && this.job.salary;
    return true;
  }

  getStepTitle() {
    if (this.currentStep === 1) return 'Tell us about the role';
    if (this.currentStep === 2) return 'Where & How much?';
    return 'Final details';
  }

  getStepDescription() {
    if (this.currentStep === 1) return 'Provide the basic information about the position.';
    if (this.currentStep === 2) return 'Set the location and salary expectations.';
    return 'Add a detailed description to attract the best talent.';
  }

  onSubmit() {
    this.jobService.createJob(this.job).subscribe({
      next: () => {
        this.showSuccess = true;
      },
      error: (err) => alert('Failed to create job')
    });
  }

  goToJobs() {
    this.router.navigate(['/jobs']);
  }
}
