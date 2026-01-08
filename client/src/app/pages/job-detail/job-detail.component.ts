import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, IconComponent],
  template: `
    <div class="job-detail-container" *ngIf="job">
      <div class="container">
        <header class="detail-header glass-card animate-fade-up">
          <div class="header-main">
            <div class="company-badge">{{ job.company[0] }}</div>
            <div class="title-meta">
              <h1>{{ job.title }}</h1>
               <div class="meta-row">
                 <span class="meta-tag">
                   <app-icon name="briefcase" [size]="16"></app-icon>
                   {{ job.company }}
                 </span>
                 <span class="meta-tag">
                   <app-icon name="map-pin" [size]="16"></app-icon>
                   {{ job.location }}
                 </span>
                 <span class="meta-tag">
                   <app-icon name="clock" [size]="16"></app-icon>
                   Full-time
                 </span>
               </div>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline-icon">
              <app-icon name="share-2" [size]="20"></app-icon>
            </button>
            <button class="btn btn-outline-icon">
              <app-icon name="bookmark" [size]="20"></app-icon>
            </button>
          </div>
        </header>

        <div class="detail-grid">
          <main class="main-content animate-fade-up delay-100">
            <section class="glass-card info-section">
              <h2>Job Description</h2>
              <div class="description-text">
                {{ job.description }}
              </div>
              
              <div class="skills-block">
                <h3>Required Skills</h3>
                <div class="skill-tags">
                  <span class="skill-tag">Product Design</span>
                  <span class="skill-tag">Figma</span>
                  <span class="skill-tag">UX Research</span>
                  <span class="skill-tag">Prototyping</span>
                </div>
              </div>
            </section>
          </main>

          <aside class="sidebar-content animate-fade-up delay-200">
            <div class="glass-card apply-box">
              <div class="salary-box">
                <span class="label">Salary Range</span>
                <span class="amount">{{ job.salary }}</span>
                <span class="period">yearly</span>
              </div>
              
              <ng-container *ngIf="authService.currentUser$ | async as user; else loginPrompt">
                <button class="btn btn-primary btn-lg w-100" (click)="apply()" [disabled]="applied">
                  <app-icon [name]="applied ? 'check-circle' : 'rocket'" [size]="20"></app-icon>
                  {{ applied ? 'Applied' : 'Apply Now' }}
                </button>
              </ng-container>
              
              <ng-template #loginPrompt>
                <a routerLink="/login" class="btn btn-primary btn-lg w-100">Login to Apply</a>
              </ng-template>

              <div class="apply-footer">
                <app-icon name="shield-check" [size]="16" class="text-secondary"></app-icon>
                <span>Verified by JobPortal</span>
              </div>
            </div>

            <div class="glass-card company-card">
              <h3>About Company</h3>
              <p>Creative agency focusing on digital products and branding experiences.</p>
              <a href="#" class="btn btn-outline btn-sm w-100">View Company Profile</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-detail-container { padding: 6rem 0; background: var(--bg-color); min-height: 100vh; }
    
    .detail-header {
      padding: 3rem;
      margin-bottom: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .header-main { display: flex; gap: 2rem; align-items: center; }
      
      .company-badge {
        width: 80px; height: 80px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 800;
      }

      .title-meta {
        h1 { font-size: 2.5rem; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
        .meta-row { display: flex; gap: 1.5rem; }
        .meta-tag { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 1rem; font-weight: 500; }
      }

      .header-actions { display: flex; gap: 1rem; }
    }

    .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }

    .info-section { padding: 3rem; }
    .description-text { line-height: 1.8; color: var(--text-main); font-size: 1.1rem; margin-bottom: 3rem; white-space: pre-wrap; }

    .skills-block {
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      h3 { font-size: 1.25rem; margin-bottom: 1.5rem; }
      .skill-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; }
      .skill-tag { padding: 0.5rem 1rem; background: var(--bg-color); border-radius: 100px; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
    }

    .apply-box { padding: 2rem; margin-bottom: 2rem; text-align: center; position: sticky; top: 6rem; }
    .salary-box {
      margin-bottom: 2rem;
      .label { display: block; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem; }
      .amount { display: block; font-size: 2rem; font-weight: 800; color: var(--text-main); }
      .period { color: var(--text-muted); font-size: 0.95rem; }
    }

    .apply-footer { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }

    .company-card { padding: 2rem; h3 { margin-bottom: 1rem; } p { color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem; } }

    .btn-outline-icon { background: transparent; border: 1px solid var(--border-color); padding: 12px; border-radius: 12px; color: var(--text-muted); transition: all 0.2s; &:hover { border-color: var(--primary-color); color: var(--primary-color); background: var(--primary-light); } }

    .w-100 { width: 100%; }

    @media (max-width: 992px) { .detail-grid { grid-template-columns: 1fr; } .detail-header { flex-direction: column; text-align: center; gap: 2rem; .header-main { flex-direction: column; } .meta-row { justify-content: center; } } }
  `]
})
export class JobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  authService = inject(AuthService);

  job: any;
  applied = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJobById(id).subscribe({
        next: (job) => {
          if (job) {
            this.job = job;
          } else {
            console.error('Job not found');
            // Optionally redirect to jobs list
            // this.router.navigate(['/jobs']);
          }
        },
        error: (err) => {
          console.error('Error fetching job:', err);
        }
      });
    }
  }

  apply() {
    this.jobService.applyForJob(this.job.id, { notes: 'Applied via portal' }).subscribe({
      next: () => {
        this.applied = true;
        // Optionally show a more detailed success effect here
      },
      error: () => alert('Failed to apply. You might have already applied.')
    });
  }
}
