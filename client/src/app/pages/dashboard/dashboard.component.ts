import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, IconComponent],
  template: `
    <div class="dashboard-container">
      <div class="container">
        <header class="dashboard-header animate-fade-up">
           <div class="user-welcome" *ngIf="authService.currentUser$ | async as user">
             <h1>Welcome back, <span class="text-primary">{{ user.name }}</span>!</h1>
             <p>Here's what's happening with your job search today.</p>
           </div>
           <div class="header-actions">
             <input type="file" #resumeInput hidden (change)="onResumeUpload($event)" accept=".pdf,.doc,.docx">
             <button class="btn btn-primary" (click)="resumeInput.click()">
               <app-icon name="upload" [size]="18"></app-icon>
               Upload Resume
             </button>
           </div>
        </header>

        <div class="stats-grid">
          <div class="stat-card glass-card animate-fade-up delay-100">
            <div class="stat-icon bg-primary-light text-primary">
              <app-icon name="briefcase" [size]="24"></app-icon>
            </div>
            <div class="stat-info">
              <h3>24</h3>
              <p>Applied Jobs</p>
            </div>
            <div class="stat-chart">
               <div class="bar" style="height: 40%"></div>
               <div class="bar" style="height: 60%"></div>
               <div class="bar" style="height: 80%"></div>
               <div class="bar" style="height: 50%"></div>
            </div>
          </div>
          <div class="stat-card glass-card animate-fade-up delay-200">
            <div class="stat-icon bg-secondary-light text-secondary">
              <app-icon name="eye" [size]="24"></app-icon>
            </div>
            <div class="stat-info">
              <h3>128</h3>
              <p>Profile Views</p>
            </div>
             <div class="stat-trend positive">+12%</div>
          </div>
          <div class="stat-card glass-card animate-fade-up delay-300">
            <div class="stat-icon bg-accent-light text-accent">
              <app-icon name="message-square" [size]="24"></app-icon>
            </div>
            <div class="stat-info">
              <h3>5</h3>
              <p>Interviews</p>
            </div>
            <div class="stat-trend neutral">0%</div>
          </div>
        </div>

        <div class="dashboard-grid">
          <section class="applications-section glass-card animate-fade-up delay-300">
            <div class="section-header">
              <h2>Recent Applications</h2>
              <a href="#" class="link">View All</a>
            </div>
            
            <div class="applications-list">
               <div class="application-item">
                 <div class="company-mini-logo">G</div>
                 <div class="app-info">
                   <h4>Senior Product Designer</h4>
                   <p>Google Inc.</p>
                 </div>
                 <span class="status-badge pending">Pending</span>
                 <div class="app-date">2 days ago</div>
               </div>
               <div class="application-item">
                 <div class="company-mini-logo" style="background: #EBF8FF; color: #3182CE">M</div>
                 <div class="app-info">
                   <h4>Frontend Engineer</h4>
                   <p>Microsoft</p>
                 </div>
                 <span class="status-badge interview">Interview</span>
                 <div class="app-date">5 days ago</div>
               </div>
               <div class="application-item">
                 <div class="company-mini-logo" style="background: #FEEBC8; color: #DD6B20">A</div>
                 <div class="app-info">
                   <h4>UX Researcher</h4>
                   <p>Amazon</p>
                 </div>
                 <span class="status-badge rejected">Closed</span>
                 <div class="app-date">1 week ago</div>
               </div>
            </div>
          </section>

          <aside class="activity-section glass-card animate-fade-up delay-300">
            <h3>Job Recommendations</h3>
            <div class="rec-list">
              <div class="rec-item" *ngFor="let i of [1,2,3]">
                <div class="rec-info">
                  <h4>Product Lead</h4>
                  <p>Stripe • $150k - $200k</p>
                </div>
                <app-icon name="chevron-right" [size]="16" class="text-muted"></app-icon>
              </div>
            </div>
            <button class="btn btn-outline btn-full">See More</button>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 6rem 0; background: var(--bg-color); min-height: 100vh; }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
      gap: 1.5rem;
      
      h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
      p { color: var(--text-muted); }
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .analysis-alert {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 12px;
      margin-bottom: 3rem;
      align-items: flex-start;
      
      .alert-icon { font-size: 1.5rem; }
      .alert-content { 
        flex: 1;
        h3 { font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--primary-color); }
        p { margin: 0; color: var(--text-main); font-size: 0.95rem; }
      }
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      display: inline-block;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      position: relative;
      overflow: hidden;
      
      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .stat-info {
        h3 { font-size: 1.75rem; margin-bottom: 0.25rem; }
        p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
      }

      .stat-chart {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 40px;
        margin-left: auto;
        
        .bar { width: 6px; background: var(--primary-color); border-radius: 4px; opacity: 0.3; }
      }

      .stat-trend {
        margin-left: auto;
        font-size: 0.85rem;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 6px;
        
        &.positive { background: #E6FFFA; color: #319795; }
        &.neutral { background: #EDF2F7; color: #718096; }
      }
    }

    .bg-primary-light { background: rgba(108, 99, 255, 0.15); }
    .bg-secondary-light { background: rgba(0, 180, 216, 0.15); }
    .bg-accent-light { background: rgba(226, 251, 108, 0.15); }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      
      h2 { font-size: 1.5rem; }
      .link { color: var(--primary-color); font-weight: 600; font-size: 0.9rem; }
    }

    .applications-section, .activity-section { padding: 2.5rem; }

    .application-item {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.25rem 0;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child { border-bottom: none; }
      
      .company-mini-logo {
        width: 48px;
        height: 48px;
        background: rgba(255,255,255,0.05);
        color: var(--primary-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.1rem;
      }
      
      .app-info {
        flex: 1;
        h4 { margin-bottom: 0.25rem; font-size: 1rem; }
        p { margin: 0; color: var(--text-muted); font-size: 0.85rem; }
      }

      .app-date { color: var(--text-muted); font-size: 0.85rem; }
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      
      &.pending { background: rgba(49, 130, 206, 0.15); color: #4299E1; }
      &.interview { background: rgba(49, 151, 149, 0.15); color: #38B2AC; }
      &.rejected { background: rgba(229, 62, 62, 0.15); color: #F56565; }
    }

    .rec-list { margin: 1.5rem 0; }
    .rec-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--bg-color);
      border-radius: 12px;
      margin-bottom: 1rem;
      
      h4 { font-size: 0.95rem; margin-bottom: 0.25rem; }
      p { margin: 0; font-size: 0.8rem; color: var(--text-muted); }
    }

    .btn-full { width: 100%; }

    @media (max-width: 992px) {
      .dashboard-grid { grid-template-columns: 1fr; }
      .dashboard-header { flex-direction: column; align-items: flex-start; }
      .header-actions { width: 100%; justify-content: flex-start; }
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
  isAnalyzing = false;
  analysisResult: string | null = null;

  onResumeUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Resume "${file.name}" uploaded successfully!`);
    }
  }

  analyzeProfile() {
    this.isAnalyzing = true;
    this.analysisResult = null;

    // Simulate complex analysis
    setTimeout(() => {
      this.isAnalyzing = false;
      this.analysisResult = "Based on your recent activity and resume, your profile is 85% optimized! You're a strong candidate for Senior Frontend roles. We recommend adding more details about your Angular projects to increase visibility.";
    }, 2000);
  }
}
