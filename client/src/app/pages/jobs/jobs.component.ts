import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, DatePipe, SlicePipe, IconComponent, FormsModule],
  template: `
    <div class="jobs-container">
      <div class="container">
        <header class="page-header animate-fade-up">
          <h1>Find Your Dream Job</h1>
          <p>Explore thousands of job opportunities with top companies.</p>
          
          <div class="search-bar-wrapper">
            <div class="search-bar glass-card">
              <div class="search-input-group">
                <app-icon name="search" [size]="20" class="search-icon"></app-icon>
                <input type="text" placeholder="Job title, keywords, or company" 
                       [(ngModel)]="searchQuery" 
                       (keyup.enter)="onSearch()"
                       (input)="onSearch()">
              </div>
              <div class="divider"></div>
              <div class="search-input-group">
                <app-icon name="map-pin" [size]="20" class="search-icon"></app-icon>
                <input type="text" placeholder="City, state, or zip code" 
                       [(ngModel)]="locationQuery"
                       (keyup.enter)="onSearch()"
                       (input)="onSearch()">
              </div>
              <button class="btn btn-primary search-btn" (click)="onSearch()">Search</button>
            </div>
          </div>
        </header>
        
        <div class="jobs-layout">
          <aside class="filters animate-fade-up delay-100">
            <div class="filter-group">
              <h3>Job Type</h3>
              <label><input type="checkbox" [(ngModel)]="filters.fullTime" (change)="onFilterChange()"> Full-time</label>
              <label><input type="checkbox" [(ngModel)]="filters.remote" (change)="onFilterChange()"> Remote</label>
              <label><input type="checkbox" [(ngModel)]="filters.contract" (change)="onFilterChange()"> Contract</label>
              <label><input type="checkbox" [(ngModel)]="filters.internship" (change)="onFilterChange()"> Internship</label>
            </div>
            <div class="filter-group">
              <h3>Experience</h3>
              <label><input type="checkbox" [(ngModel)]="filters.entryLevel" (change)="onFilterChange()"> Entry Level</label>
              <label><input type="checkbox" [(ngModel)]="filters.midLevel" (change)="onFilterChange()"> Mid Level</label>
              <label><input type="checkbox" [(ngModel)]="filters.seniorLevel" (change)="onFilterChange()"> Senior Level</label>
            </div>
            
            <!-- Top Jobs Section -->
            <div class="top-jobs-sidebar glass-card">
              <h3>🔥 Top Jobs</h3>
              <div class="top-jobs-list">
                <div *ngFor="let topJob of topJobs.slice(0, 5); let i = index" class="top-job-item" (click)="scrollToJob(topJob.id)">
                  <div class="top-job-logo">{{ topJob.company[0] }}</div>
                  <div class="top-job-info">
                    <p class="top-job-title">{{ topJob.title }}</p>
                    <p class="top-job-company">{{ topJob.company }}</p>
                    <span class="top-job-badge">Featured</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main class="jobs-list">
            <div *ngIf="loading" class="skeleton-grid">
               <div *ngFor="let i of [1,2,3,4]" class="skeleton-card glass-card">
                 <div class="skeleton-header">
                   <div class="skeleton-circle"></div>
                   <div class="skeleton-lines">
                     <div class="skeleton-line w-50"></div>
                     <div class="skeleton-line w-25"></div>
                   </div>
                 </div>
                 <div class="skeleton-body">
                   <div class="skeleton-line"></div>
                   <div class="skeleton-line w-75"></div>
                 </div>
               </div>
            </div>

            <div *ngIf="!loading && jobs.length === 0" class="no-jobs">
              <app-icon name="search" [size]="48" class="text-muted"></app-icon>
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>

            <div *ngIf="!loading && jobs.length > 0" class="jobs-grid">
              <div *ngFor="let job of jobs; let i = index" 
                   [attr.data-job-id]="job.id"
                   class="job-card glass-card animate-fade-up" 
                   [style.animation-delay.ms]="i * 100">
                <div class="job-card-header">
                  <div class="company-logo-wrapper">
                    <span class="company-logo">{{ job.company[0] }}</span>
                  </div>
                  <div class="job-info">
                    <h3>{{ job.title }}</h3>
                    <div class="company-meta">
                      <span class="company-name">{{ job.company }}</span>
                      <span class="status-dot"></span>
                      <span class="time-ago">{{ job.created_at | date }}</span>
                    </div>
                  </div>
                  <button class="btn-icon">
                    <app-icon name="bookmark" [size]="20"></app-icon>
                  </button>
                </div>
                
                <div class="job-tags">
                  <span class="tag">
                    <app-icon name="map-pin" [size]="14"></app-icon>
                    {{ job.location }}
                  </span>
                  <span class="tag">
                    <app-icon name="dollar" [size]="14"></app-icon>
                    {{ job.salary }}
                  </span>
                  <span class="tag type">{{ job.jobType || 'Full-time' }}</span>
                </div>

                <p class="job-preview">{{ job.description | slice:0:120 }}...</p>

                <div class="job-card-footer">
                  <div class="applicants">
                    <div class="avatar-group">
                      <img src="https://i.pravatar.cc/32?u=1" alt="user">
                      <img src="https://i.pravatar.cc/32?u=2" alt="user">
                      <div class="avatar-plus">+12</div>
                    </div>
                    <span>Applied</span>
                  </div>
                  <button (click)="openApplyModal(job)" class="btn btn-primary btn-sm">Apply Now</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <!-- Application Modal -->
      <div class="modal-backdrop" *ngIf="showApplyModal" (click)="closeApplyModal()"></div>
      <div class="modal-content glass-card animate-fade-up" *ngIf="showApplyModal">
        <div class="modal-header">
          <h2>Apply for {{ selectedJob?.title }}</h2>
          <button class="btn-icon" (click)="closeApplyModal()">
             <app-icon name="x" [size]="24"></app-icon>
          </button>
        </div>
        <div class="modal-body">
          <p class="company-name">at {{ selectedJob?.company }}</p>
          
          <div class="form-group">
            <label>Upload Resume</label>
            <div class="file-upload-area" (click)="fileInput.click()" [class.has-file]="resumeFile">
              <input type="file" #fileInput hidden (change)="onFileSelected($event)" accept=".pdf,.doc,.docx">
              <app-icon name="upload-cloud" [size]="32" class="text-primary"></app-icon>
              <p *ngIf="!resumeFile">Click to upload your resume (PDF/DOC)</p>
              <p *ngIf="resumeFile" class="file-name">{{ resumeFile.name }}</p>
            </div>
          </div>

          <div class="form-group">
            <label>Cover Letter (Optional)</label>
            <textarea rows="4" placeholder="Why are you a good fit for this role?"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" (click)="closeApplyModal()">Cancel</button>
          <button class="btn btn-primary" (click)="submitApplication()" [disabled]="!resumeFile">Submit Application</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jobs-container {
      padding: 6rem 0;
      background: var(--bg-color);
      min-height: 100vh;
    }

    .page-header {
      text-align: center;
      margin-bottom: 4rem;
      
      h1 { font-size: 3.5rem; margin-bottom: 1rem; }
      p { color: var(--text-muted); font-size: 1.2rem; }
    }

    .search-bar-wrapper {
      margin: 3rem auto 0;
      max-width: 900px;
      padding: 0 1rem;
    }

    .search-bar {
      padding: 0.75rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.03);
    }

    .search-input-group {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;
      height: 50px;
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
      transition: all 0.3s ease;
      border: 1px solid transparent;

      &:focus-within {
        background: rgba(0,0,0,0.3);
        border-color: rgba(255,255,255,0.1);
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
      }
      
      .search-icon {
        opacity: 0.5;
        transition: opacity 0.3s;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 1rem;
        color: var(--text-main);
        outline: none;
        width: 100%;
        
        &::placeholder { color: var(--text-muted); opacity: 0.7; }
        
        &:focus + .search-icon, &:focus ~ .search-icon {
           opacity: 1;
           color: var(--primary-color);
        }
      }
    }

    .divider { 
      width: 1px; 
      height: 40px; 
      background: rgba(255,255,255,0.1);
      margin: 0 0.5rem;
    }

    .search-btn {
      padding: 0 2.5rem;
      height: 50px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
      }
    }

    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 100;
      animation: fadeIn 0.3s ease;
    }

    .modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      z-index: 101;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1.5rem;
      
      h2 { font-size: 1.5rem; margin: 0; }
    }

    .company-name {
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-main);
        font-weight: 500;
      }
      
      textarea {
        width: 100%;
        padding: 1rem;
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        color: var(--text-main);
        resize: vertical;
        outline: none;
        
        &:focus { border-color: var(--primary-color); }
      }
    }

    .file-upload-area {
      border: 2px dashed rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: var(--primary-color);
        background: rgba(255,255,255,0.02);
      }
      
      &.has-file {
        border-style: solid;
        border-color: var(--primary-color);
        background: rgba(99, 102, 241, 0.1);
      }
      
      p { margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
      .file-name { color: var(--primary-color); font-weight: 600; }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .jobs-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 3rem;
    }

    .filters {
      .filter-group {
        margin-bottom: 2rem;
        
        h3 { font-size: 1.1rem; margin-bottom: 1rem; }
        
        label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
          
          &:hover { color: var(--primary-color); }
          
          input { accent-color: var(--primary-color); }
        }
      }
    }

    .jobs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 2rem;
    }

    .job-card {
      padding: 2rem;
      transition: all var(--transition-base);
      border: 1px solid rgba(255,255,255,0.5);
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-color);
      }
    }

    .job-card-header {
      display: flex;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
      position: relative;
    }

    .company-logo-wrapper {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .company-logo {
      background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      font-size: 1.5rem;
    }

    .job-info {
      flex: 1;
      h3 { margin-bottom: 0.5rem; font-size: 1.25rem; }
    }

    .company-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      
      .status-dot { width: 4px; height: 4px; border-radius: 50%; background: #CBD5E0; }
    }

    .btn-icon {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s;
      
      &:hover { background: var(--border-color); color: var(--accent-color); }
    }

    .job-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .tag {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.05);
      color: var(--text-muted);
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 500;
      
      &.type { 
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%); 
        color: #00D4FF; 
        border: 1px solid rgba(0, 212, 255, 0.3);
      }
    }

    .job-preview {
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .job-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.5rem;
      border-top: 1px dashed var(--border-color);
    }

    .applicants {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      span { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
    }

    .avatar-group {
      display: flex;
      
      img, .avatar-plus {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid white;
        margin-left: -8px;
        
        &:first-child { margin-left: 0; }
      }
      
      .avatar-plus {
        background: var(--primary-color);
        color: white;
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }
    }

    /* Skeleton Loading Styles */
    .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 2rem; }
    .skeleton-card { padding: 2rem; height: 300px; }
    .skeleton-header { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .skeleton-circle { width: 56px; height: 56px; border-radius: 12px; background: #EDF2F7; }
    .skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
    .skeleton-line { height: 12px; background: #EDF2F7; border-radius: 4px; }
    .w-50 { width: 50%; }
    .w-25 { width: 25%; }
    .w-75 { width: 75%; }

    .top-jobs-sidebar {
      margin-top: 3rem;
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .top-jobs-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .top-job-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255,255,255,0.03);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: rgba(255,255,255,0.08);
        transform: translateX(4px);
      }
    }

      .top-job-logo {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      color: #00D4FF;
      flex-shrink: 0;
    }

    .top-job-info {
      flex: 1;
      min-width: 0;
      
      .top-job-title {
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .top-job-company {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: 0.5rem;
      }
      
      .top-job-badge {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        background: linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(255, 107, 107, 0.25) 100%);
        color: #FBBF24;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 600;
        border: 1px solid rgba(251, 191, 36, 0.3);
      }
    }

    .highlight-job {
      animation: highlightPulse 2s ease-in-out;
      border-color: var(--primary-color) !important;
    }

    @keyframes highlightPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.5); }
      50% { box-shadow: 0 0 0 8px rgba(0, 212, 255, 0); }
    }

    .no-jobs {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-muted);
      
      h3 { margin: 1rem 0 0.5rem; font-size: 1.5rem; }
      p { font-size: 1rem; }
    }

    @media (max-width: 992px) {
      .jobs-container { padding: 3rem 0; }
      .page-header h1 { font-size: 2.5rem; }
      .page-header p { font-size: 1rem; }
      .jobs-layout { 
        grid-template-columns: 1fr; 
        gap: 2rem;
      }
      .filters { 
        display: block;
        position: sticky;
        top: 80px;
        z-index: 10;
        background: var(--bg-color);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        margin-bottom: 2rem;
        max-height: 400px;
        overflow-y: auto;
      }
      .search-bar { 
        flex-direction: column; 
        gap: 1rem;
        padding: 1.5rem;
        
        .divider { display: none; } 
        .btn { width: 100%; } 
        .search-input { width: 100%; }
      }
      .jobs-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .job-card {
        padding: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .jobs-container { padding: 2rem 0; }
      .page-header { margin-bottom: 2rem; }
      .page-header h1 { font-size: 2rem; }
      .top-jobs-sidebar {
        margin-top: 2rem;
        padding: 1rem;
      }
      .top-job-item {
        padding: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .page-header h1 { font-size: 1.75rem; }
      .search-bar {
        padding: 1rem;
      }
      .job-card {
        padding: 1rem;
      }
      .job-card-header {
        flex-wrap: wrap;
        gap: 1rem;
      }
      .company-logo-wrapper {
        width: 48px;
        height: 48px;
      }
      .job-tags {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class JobsComponent implements OnInit {
  jobService = inject(JobService);
  route = inject(ActivatedRoute);
  jobs: any[] = [];
  allJobs: any[] = [];
  topJobs: any[] = [];
  loading = true;
  searchQuery: string = '';
  locationQuery: string = '';

  filters = {
    fullTime: false,
    remote: false,
    contract: false,
    internship: false,
    entryLevel: false,
    midLevel: false,
    seniorLevel: false
  };

  // Sample jobs data with Bangalore and Delhi locations
  sampleJobs = [
    { title: 'Senior Full Stack Developer', company: 'TechCorp', location: 'Bangalore, Karnataka', salary: '₹18L - ₹35L', jobType: 'Full-time', experience: 'Senior Level', description: 'Lead development of cutting-edge web applications using React, Node.js, and cloud technologies.' },
    { title: 'Frontend Developer', company: 'DesignStudio', location: 'Delhi, NCR', salary: '₹12L - ₹25L', jobType: 'Remote', experience: 'Mid Level', description: 'Create beautiful and responsive user interfaces using modern JavaScript frameworks.' },
    { title: 'Backend Engineer', company: 'DataSystems', location: 'Bangalore, Karnataka', salary: '₹15L - ₹28L', jobType: 'Remote', experience: 'Mid Level', description: 'Build scalable backend systems and APIs using Node.js, Python, and microservices architecture.' },
    { title: 'React Developer', company: 'WebSolutions', location: 'Delhi, NCR', salary: '₹10L - ₹20L', jobType: 'Full-time', experience: 'Mid Level', description: 'Develop modern React applications with TypeScript and state management libraries.' },
    { title: 'DevOps Engineer', company: 'CloudTech', location: 'Bangalore, Karnataka', salary: '₹20L - ₹40L', jobType: 'Remote', experience: 'Senior Level', description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure system reliability.' },
    { title: 'UI/UX Designer', company: 'CreativeAgency', location: 'Delhi, NCR', salary: '₹8L - ₹18L', jobType: 'Full-time', experience: 'Mid Level', description: 'Design intuitive user experiences and create stunning visual designs for web and mobile.' },
    { title: 'Python Developer', company: 'AI Innovations', location: 'Bangalore, Karnataka', salary: '₹14L - ₹26L', jobType: 'Full-time', experience: 'Mid Level', description: 'Develop Python applications and work with machine learning frameworks.' },
    { title: 'Java Developer', company: 'EnterpriseSoft', location: 'Delhi, NCR', salary: '₹16L - ₹30L', jobType: 'Full-time', experience: 'Senior Level', description: 'Build enterprise-level Java applications using Spring Boot and microservices.' },
    { title: 'Mobile App Developer', company: 'AppWorks', location: 'Bangalore, Karnataka', salary: '₹13L - ₹24L', jobType: 'Full-time', experience: 'Mid Level', description: 'Develop native and cross-platform mobile applications for iOS and Android.' },
    { title: 'Software Engineering Intern', company: 'StartupHub', location: 'Delhi, NCR', salary: '₹3L - ₹5L', jobType: 'Internship', experience: 'Entry Level', description: 'Learn and contribute to real-world software projects in a fast-paced startup environment.' },
    { title: 'Web Development Intern', company: 'DigitalAgency', location: 'Bangalore, Karnataka', salary: '₹2.5L - ₹4.5L', jobType: 'Internship', experience: 'Entry Level', description: 'Gain hands-on experience in web development with HTML, CSS, JavaScript, and modern frameworks.' },
    { title: 'Data Science Intern', company: 'AnalyticsPro', location: 'Delhi, NCR', salary: '₹3.5L - ₹6L', jobType: 'Internship', experience: 'Entry Level', description: 'Work with data analysis, machine learning models, and visualization tools.' },
    { title: 'Product Manager', company: 'ProductCo', location: 'Bangalore, Karnataka', salary: '₹22L - ₹45L', jobType: 'Full-time', experience: 'Senior Level', description: 'Lead product strategy, work with cross-functional teams, and drive product development.' },
    { title: 'QA Engineer', company: 'QualityAssurance', location: 'Delhi, NCR', salary: '₹10L - ₹20L', jobType: 'Full-time', experience: 'Mid Level', description: 'Ensure software quality through comprehensive testing and automation.' },
    { title: 'Technical Writer', company: 'DocSolutions', location: 'Bangalore, Karnataka', salary: '₹6L - ₹12L', jobType: 'Full-time', experience: 'Entry Level', description: 'Create clear and comprehensive technical documentation for software products.' }
  ];

  ngOnInit() {
    // Check for query params from home page navigation
    this.route.queryParams.subscribe(params => {
      if (params['jobType']) {
        const jobType = params['jobType'];
        // Reset all filters first
        this.filters = {
          fullTime: false,
          remote: false,
          contract: false,
          internship: false,
          entryLevel: false,
          midLevel: false,
          seniorLevel: false
        };

        if (jobType === 'remote') {
          this.filters.remote = true;
        } else if (jobType === 'full-time') {
          this.filters.fullTime = true;
        } else if (jobType === 'internship') {
          this.filters.internship = true;
        }
      }

      // Handle search query from category clicks
      if (params['search']) {
        this.searchQuery = params['search'];
        // Apply filters after jobs are loaded
        setTimeout(() => {
          this.applyFilters();
        }, 1500);
      }
    });

    this.loadJobs();
    this.loadTopJobs();
  }

  loadJobs() {
    this.loading = true;
    setTimeout(() => {
      this.jobService.getJobs().subscribe({
        next: (jobs) => {
          // If no jobs from API, use sample jobs
          if (jobs && jobs.length > 0) {
            this.allJobs = jobs;
          } else {
            // Add sample jobs with valid MongoDB-style IDs
            this.allJobs = this.sampleJobs.map((job, index) => ({
              ...job,
              id: `0000000000000000000000${(index + 1).toString(16).padStart(2, '0')}`,
              created_at: new Date().toISOString()
            }));
          }
          this.applyFilters();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading jobs:', err);
          // Use sample jobs with valid MongoDB-style IDs on error
          this.allJobs = this.sampleJobs.map((job, index) => ({
            ...job,
            id: `0000000000000000000000${(index + 1).toString(16).padStart(2, '0')}`,
            created_at: new Date().toISOString()
          }));
          this.applyFilters();
          this.loading = false;
        }
      });
    }, 1200); // Simulate network delay for skeleton effect
  }

  loadTopJobs() {
    this.jobService.getTopJobs().subscribe({
      next: (topJobs) => {
        // Ensure we have exactly 5 top jobs
        if (topJobs && topJobs.length > 0) {
          this.topJobs = topJobs.slice(0, 5);
        } else {
          // Use sample jobs as top jobs with valid IDs
          this.topJobs = this.sampleJobs.slice(0, 5).map((job, index) => ({
            ...job,
            id: `ff00000000000000000000${(index + 1).toString(16).padStart(2, '0')}`,
            isFeatured: true,
            created_at: new Date().toISOString()
          }));
        }
      },
      error: (err) => {
        console.error('Error loading top jobs:', err);
        // Use sample jobs as top jobs with valid IDs
        this.topJobs = this.sampleJobs.slice(0, 5).map((job, index) => ({
          ...job,
          id: `ff00000000000000000000${(index + 1).toString(16).padStart(2, '0')}`,
          isFeatured: true,
          created_at: new Date().toISOString()
        }));
      }
    });
  }

  applyFilters() {
    let filtered = [...this.allJobs];

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (this.locationQuery.trim()) {
      const location = this.locationQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location)
      );
    }

    // Job type filters
    const jobTypeFilters: string[] = [];
    if (this.filters.fullTime) jobTypeFilters.push('Full-time');
    if (this.filters.remote) jobTypeFilters.push('Remote');
    if (this.filters.contract) jobTypeFilters.push('Contract');
    if (this.filters.internship) jobTypeFilters.push('Internship');

    if (jobTypeFilters.length > 0) {
      filtered = filtered.filter(job =>
        jobTypeFilters.includes(job.jobType)
      );
    }

    // Experience filters
    const experienceFilters: string[] = [];
    if (this.filters.entryLevel) experienceFilters.push('Entry Level');
    if (this.filters.midLevel) experienceFilters.push('Mid Level');
    if (this.filters.seniorLevel) experienceFilters.push('Senior Level');

    if (experienceFilters.length > 0) {
      filtered = filtered.filter(job =>
        experienceFilters.includes(job.experience)
      );
    }

    this.jobs = filtered;
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  scrollToJob(jobId: string) {
    const element = document.querySelector(`[data-job-id="${jobId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-job');
      setTimeout(() => element.classList.remove('highlight-job'), 2000);
    }
  }

  /* Application Modal Logic */
  showApplyModal = false;
  selectedJob: any = null;
  resumeFile: File | null = null;

  openApplyModal(job: any) {
    this.selectedJob = job;
    this.showApplyModal = true;
    this.resumeFile = null;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeApplyModal() {
    this.showApplyModal = false;
    this.selectedJob = null;
    this.resumeFile = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File is too large. Max 5MB allowed.');
        return;
      }
      this.resumeFile = file;
    }
  }

  submitApplication() {
    if (!this.resumeFile) return;

    // Simulate API call
    const btn = document.querySelector('.modal-footer .btn-primary') as HTMLButtonElement;
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = 'Submitting...';
      btn.disabled = true;

      setTimeout(() => {
        alert(`Application submitted successfully for ${this.selectedJob.title}!`);
        this.closeApplyModal();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    }
  }
}
