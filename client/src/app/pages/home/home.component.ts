import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, NgFor, NgIf],
  template: `
    <main class="home-portal">
      <div class="container main-layout">
        
        <!-- Left & Center: Hero Area -->
        <section class="hero-container animate-fade-up">
          <div class="hero-content glass-card dark">
            <div class="hero-text-area">
              <h1 class="hero-title">Shape Your <br> Destiny <span class="dim">Craft</span> <br> Your Vision</h1>
              
              <div class="job-tag-badge">
                 <app-icon name="rocket" [size]="16"></app-icon>
                 <span>Full Stack Development</span>
              </div>

              <!-- Floating Job Info Bar -->
              <div class="floating-apply-bar glass-card light-blur">
                <div class="info-item">
                  <app-icon name="briefcase" [size]="20"></app-icon>
                  <span>Full-Time</span>
                </div>
                <div class="info-item">
                  <app-icon name="rupee" [size]="20"></app-icon>
                  <span>18 - 35 LPA</span>
                </div>
                <button class="btn-hero-apply" (click)="openApplyModal({title: 'Lead Full Stack Developer'})">Apply</button>
              </div>
            </div>

            <div class="hero-image-box">
              <img src="images/professional-man.png" alt="Professional" class="man-img">
            </div>
          </div>

          <!-- Bottom: Job Searching & Filters -->
          <div class="bottom-tools">
            <div class="searching-card glass-card dark">
              <h3>Job Searching</h3>
              <div class="filter-tags">
                <span class="f-tag" (click)="navigateToJobs('Remote')">Remote</span>
                <span class="f-tag" (click)="navigateToJobs('Full-time')">Full-Time</span>
                <span class="f-tag" (click)="navigateToJobs('Internship')">Internship</span>
              </div>
              
              <div class="category-previews">
                <div class="cat-pill java" (click)="filterBy('Java Developer')">Java Developer</div>
                <div class="cat-pill python" (click)="filterBy('Python Developer')">Python Developer</div>
                <div class="cat-pill design" (click)="filterBy('UI/UX Designer')">UI/UX Designer</div>
                <div class="cat-pill fullstack" (click)="filterBy('Full Stack Development')">Full Stack Development</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Right: Sidebar -->
        <aside class="sidebar-container animate-fade-up delay-100">
          <!-- Tips Card -->
          <div class="tips-container">
            <div class="tips-card">
              <div class="tips-header">
                 <span>Tip 1</span>
                 <div class="play-icon">▶</div>
              </div>
              <h4>How to talk professionally with clients</h4>
            </div>
            <div class="tips-card">
              <div class="tips-header">
                 <span>Tip 2</span>
                 <div class="play-icon">▶</div>
              </div>
              <h4>Build a standout resume that gets noticed</h4>
            </div>
          </div>

          <!-- Top Jobs List -->
          <div class="top-jobs-card glass-card dark">
            <h3>{{ activeFilter ? activeFilter + ' Results' : 'Top Jobs' }}</h3>
            <div class="jobs-stack">
              <div class="sidebar-job-item" *ngFor="let job of displayedJobs.slice(0, 5)">
                <div class="s-job-logo" [style.background]="job.color || 'rgba(255,255,255,0.1)'">{{ job.logo }}</div>
                <div class="s-job-info">
                  <p class="s-title">{{ job.title }}</p>
                  <p class="s-loc">{{ job.location }}</p>
                </div>
                <button class="btn-s-apply" (click)="openApplyModal(job)">Apply Now</button>
              </div>
            </div>
            <button class="btn-show-more" *ngIf="!isExpanded" (click)="showMore()">Show More</button>
            <button class="btn-show-more outline" *ngIf="isExpanded" (click)="showLess()">Show Less</button>
          </div>
        </aside>

      </div>

      <!-- Application Modal -->
      <div class="app-modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="app-modal glass-card light" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Apply for Position</h2>
            <p>Role: <strong>{{ selectedJob?.title }}</strong></p>
          </div>
          
          <form class="apply-form" (submit)="submitForm($event)">
             <div class="form-group">
                <label>Employee Name</label>
                <input type="text" placeholder="John Doe" required>
             </div>
             <div class="form-group">
                <label>Total Experience (Years)</label>
                <input type="number" placeholder="2" required>
             </div>
             <div class="form-group">
                <label>Current/Last Company</label>
                <input type="text" placeholder="TCS / Google / Startup" required>
             </div>
             <div class="form-group">
                <label>Resume / CV</label>
                <div class="file-drop">
                   <app-icon name="plus" [size]="20"></app-icon>
                   <span>{{ fileName || 'Click to upload Resume' }}</span>
                   <input type="file" (change)="handleFile($event)" accept=".pdf,.doc,.docx">
                </div>
             </div>
             <button type="submit" class="btn-submit">Submit Application</button>
          </form>
          <button class="close-x" (click)="closeModal()">&times;</button>
        </div>
      </div>

    </main>
  `,
  styles: [`
    :host {
      --dark-bg: #0A0E27;
      --card-dark: #151932;
      --text-white: #FFFFFF;
      --text-dim: #A8B2D1;
      --accent-yellow: #FBBF24;
      --accent-orange: #FF6B6B;
      --accent-blue: #00D4FF;
    }

    .home-portal {
      background: var(--dark-bg);
      min-height: 100vh;
      padding: 2rem 0;
      color: var(--text-white);
    }

    .main-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 2rem;
    }

    .hero-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .hero-content {
      background: var(--card-dark) !important;
      border-radius: 40px;
      height: 540px;
      display: flex;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(255,255,255,0.05);
    }

    .hero-text-area {
      flex: 1.2;
      padding: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 2;
    }

    .hero-title {
      font-size: 4.5rem;
      line-height: 1.1;
      font-weight: 800;
      margin-bottom: 2.5rem;
      letter-spacing: -0.02em;
      
      .dim { color: var(--text-dim); }
    }

    .job-tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.8rem 1.8rem;
      border-radius: 100px;
      font-weight: 600;
      margin-bottom: 4rem;
      width: fit-content;
    }

    .floating-apply-bar {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      padding: 1.5rem 3rem;
      background: rgba(255, 255, 255, 0.98) !important;
      color: #000;
      border-radius: 28px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.5);
      width: fit-content;
      
      .info-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-size: 1.2rem;
      }
    }

    .btn-hero-apply {
      background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
      color: #fff;
      border: none;
      padding: 1.2rem 3rem;
      border-radius: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
      
      &:hover { 
        transform: translateY(-3px); 
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.5);
        background: linear-gradient(135deg, #00B8E6 0%, #6D28D9 100%);
      }
    }

    .hero-image-box {
      flex: 1;
      position: relative;
      
      .man-img {
        height: 115%;
        position: absolute;
        bottom: 0;
        right: 0;
        object-fit: contain;
        filter: drop-shadow(0 20px 50px rgba(0,0,0,0.6));
      }
    }

    .bottom-tools {
      height: 280px;
    }

    .searching-card {
      padding: 3rem;
      height: 100%;
      background: var(--card-dark) !important;
      border-radius: 35px;
      border: 1px solid rgba(255,255,255,0.05);
      
      h3 { margin-bottom: 2rem; font-size: 1.8rem; }
    }

    .filter-tags {
      display: flex;
      gap: 1.2rem;
      margin-bottom: 3.5rem;
      
      .f-tag {
        padding: 0.6rem 2rem;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 100px;
        color: var(--text-dim);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: #fff; }

        &.active {
          background: var(--text-white);
          color: #000;
          border-color: var(--text-white);
          font-weight: 700;
        }
      }
    }

    .category-previews {
      display: flex;
      gap: 1.2rem;
      flex-wrap: wrap;
      
      .cat-pill {
        padding: 1rem 2.5rem;
        border-radius: 22px;
        font-weight: 700;
        color: #000;
        cursor: pointer;
        transition: transform 0.2s;
        
        &:hover { transform: translateY(-3px); }

        &.java { background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%); color: #fff; }
        &.python { background: linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%); color: #fff; }
        &.design { background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); color: #fff; }
        &.fullstack { background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); color: #000; }
      }
    }

    /* Sidebar Styles */
    .sidebar-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .tips-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .tips-card {
      background: var(--accent-yellow);
      color: #000;
      padding: 2rem;
      border-radius: 30px;
      transition: transform 0.2s;
      cursor: pointer;
      width: 100%;
      box-sizing: border-box;
      min-width: 0;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      }
      
      .tips-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8rem;
        
        .play-icon {
          background: #000;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          transition: transform 0.2s;
        }
      }
      
      &:hover .play-icon {
        transform: scale(1.1);
      }
      
      h4 { 
        font-size: 1.2rem; 
        font-weight: 800; 
        line-height: 1.3;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }
    }

    .top-jobs-card {
      background: var(--card-dark) !important;
      border-radius: 40px;
      padding: 3rem;
      flex: 1;
      border: 1px solid rgba(255,255,255,0.05);
      
      h3 { margin-bottom: 3rem; font-size: 1.5rem; }
    }

    .jobs-stack {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .sidebar-job-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      
      .s-job-logo {
        width: 56px;
        height: 56px;
        background: rgba(255,255,255,0.1);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 1.2rem;
        color: #000;
      }
      
      .s-job-info {
        flex: 1;
        .s-title { font-weight: 700; margin-bottom: 0.3rem; font-size: 1.1rem; }
        .s-loc { color: var(--text-dim); font-size: 0.85rem; font-weight: 500; }
      }
    }

    .btn-s-apply {
      background: var(--text-white);
      color: #000;
      border: none;
      padding: 0.7rem 1.4rem;
      border-radius: 14px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.2s;
      &:hover { opacity: 0.85; }
    }

    .btn-show-more {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-white);
      padding: 1.2rem;
      border-radius: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.1); }
      &.outline { background: transparent; border: 1px dashed var(--accent-yellow); color: var(--accent-yellow); }
    }

    /* Application Modal */
    .app-modal-overlay {
       position: fixed;
       top: 0; left: 0; width: 100%; height: 100%;
       background: rgba(0,0,0,0.85);
       backdrop-filter: blur(8px);
       z-index: 2000;
       display: flex; align-items: center; justify-content: center;
       padding: 20px;
    }

    .app-modal {
       width: 100%; max-width: 550px;
       background: #fff !important;
       color: #000; border-radius: 35px;
       padding: 3.5rem;
       position: relative;
       animation: slideUp 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }

    .close-x {
       position: absolute; top: 1.5rem; right: 1.5rem;
       background: #f0f0f0; border: none; width: 44px; height: 44px;
       border-radius: 50%; font-size: 1.5rem; cursor: pointer;
       display: flex; align-items: center; justify-content: center;
    }

    .modal-header { margin-bottom: 2.5rem; h2 { font-size: 2rem; margin-bottom: 0.5rem; } p { color: #666; } }

    .apply-form {
       display: flex; flex-direction: column; gap: 1.5rem;
       label { display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem; }
       input { 
         width: 100%; padding: 1.2rem; border-radius: 16px; 
         background: #f8f9fa; border: 2px solid transparent; 
         font-family: inherit; font-size: 1rem;
         &:focus { border-color: var(--primary-color); outline: none; }
       }
    }

    .file-drop {
       border: 2px dashed #e2e8f0; border-radius: 16px;
       padding: 2rem; display: flex; align-items: center; justify-content: center;
       gap: 1rem; color: #64748b; font-weight: 600; cursor: pointer;
       position: relative;
       input { position: absolute; opacity: 0; cursor: pointer; }
       &:hover { border-color: var(--primary-color); background: #f8faff; }
    }

    .btn-submit {
      background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
      color: #fff; 
      border: none;
      padding: 1.4rem; 
      border-radius: 20px; 
      font-weight: 700;
      font-size: 1.1rem; 
      cursor: pointer; 
      margin-top: 1rem;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
        background: linear-gradient(135deg, #00B8E6 0%, #6D28D9 100%);
      }
    }

    @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* Animations */
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
    .delay-100 { animation-delay: 0.1s; }
    
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .main-layout { 
        grid-template-columns: 1fr; 
        gap: 2rem;
      }
      .sidebar-container { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }
      .hero-content {
        height: auto;
        min-height: 400px;
      }
    }

    @media (max-width: 768px) {
      .home-portal { padding: 1rem 0; }
      .main-layout { 
        padding: 0 1rem; 
        gap: 1.5rem;
      }
      .hero-content { 
        flex-direction: column; 
        height: auto; 
        border-radius: 25px;
      }
      .hero-text-area { 
        padding: 2.5rem 1.5rem; 
        align-items: center; 
        text-align: center; 
      }
      .hero-title { 
        font-size: 2.5rem; 
        margin-bottom: 1.5rem;
      }
      .job-tag-badge {
        margin-bottom: 2rem;
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
      }
      .floating-apply-bar { 
        flex-direction: column; 
        width: 100%; 
        padding: 1.5rem; 
        gap: 1rem;
        border-radius: 20px;
        
        .info-item { 
          width: 100%; 
          justify-content: center;
          font-size: 1rem;
        } 
        .btn-hero-apply { 
          width: 100%; 
          padding: 1rem 2rem;
        } 
      }
      .hero-image-box { 
        height: 300px; 
        
        .man-img { 
          position: relative; 
          height: 100%; 
          width: 100%; 
          object-fit: contain; 
        } 
      }
      .bottom-tools { 
        height: auto; 
        margin-top: 1.5rem;
      }
      .searching-card { 
        padding: 2rem 1.5rem; 
        border-radius: 25px;
        
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .filter-tags { 
          margin-bottom: 2rem; 
          flex-wrap: wrap;
          gap: 0.8rem;
          
          .f-tag {
            padding: 0.5rem 1.5rem;
            font-size: 0.9rem;
          }
        }
        
        .category-previews {
          gap: 0.8rem;
          
          .cat-pill {
            padding: 0.8rem 1.8rem;
            font-size: 0.9rem;
          }
        }
      }
      .tips-container {
        gap: 1rem;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .tips-card {
        padding: 1.5rem;
        border-radius: 25px;
        width: 100%;
        box-sizing: border-box;
        
        h4 {
          font-size: 1.1rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
          line-height: 1.4;
        }
        
        .tips-header {
          flex-wrap: wrap;
          gap: 0.5rem;
        }
      }
      .top-jobs-card {
        padding: 2rem 1.5rem;
        border-radius: 25px;
        
        h3 {
          font-size: 1.3rem;
          margin-bottom: 2rem;
        }
      }
      .sidebar-job-item {
        flex-wrap: wrap;
        gap: 1rem;
        
        .btn-s-apply {
          width: 100%;
          text-align: center;
        }
      }
      .app-modal { 
        padding: 2rem 1.5rem; 
        margin: 1rem;
        border-radius: 25px;
      }
      .modal-header h2 {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }
      .hero-text-area {
        padding: 2rem 1rem;
      }
      .searching-card {
        padding: 1.5rem 1rem;
      }
      .filter-tags {
        gap: 0.6rem;
        
        .f-tag {
          padding: 0.4rem 1.2rem;
          font-size: 0.85rem;
        }
      }
      .category-previews {
        .cat-pill {
          padding: 0.7rem 1.5rem;
          font-size: 0.85rem;
        }
      }
      .tips-container {
        gap: 0.8rem;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .tips-card {
        padding: 1.2rem;
        width: 100%;
        box-sizing: border-box;
        min-width: 0;
        
        h4 {
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        
        .tips-header {
          font-size: 0.75rem;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
          gap: 0.5rem;
          
          .play-icon {
            width: 28px;
            height: 28px;
            font-size: 0.65rem;
            flex-shrink: 0;
          }
        }
      }
      .top-jobs-card {
        padding: 1.5rem 1rem;
      }
    }
  `]
})
export class HomeComponent {
  router = inject(Router);

  allJobs = [
    { title: 'UI/UX Designer', location: 'Bangalore, Karnataka', logo: 'U', color: '#F3E5F5', category: 'UI/UX Designer' },
    { title: 'Java Developer', location: 'Delhi, NCR', logo: 'J', color: '#E1F5FE', category: 'Java Developer' },
    { title: 'Python Developer', location: 'Bangalore, Karnataka', logo: 'P', color: '#FFEBEE', category: 'Python Developer' },
    { title: 'Full Stack Engineer', location: 'Delhi, NCR', logo: 'F', color: '#E8F5E9', category: 'Full Stack Development' },
    { title: 'Frontend Developer', location: 'Bangalore, Karnataka', logo: 'R', color: '#E0F2F1', category: 'Full Stack Development' },
    { title: 'Backend Dev', location: 'Delhi, NCR', logo: 'B', color: '#FFF8E1', category: 'Java Developer' },
    { title: 'Data Scientist', location: 'Bangalore, Karnataka', logo: 'D', color: '#FBE9E7', category: 'Python Developer' },
    { title: 'Intern - Software', location: 'Delhi, NCR', logo: 'I', color: '#F1F8E9', category: 'Internship' },
    { title: 'Mobile Developer', location: 'Bangalore, Karnataka', logo: 'M', color: '#E8EAF6', category: 'Full Stack Development' },
    { title: 'Cloud Architect', location: 'Delhi, NCR', logo: 'C', color: '#E0F7FA', category: 'Full Stack Development' },
    { title: 'Product Designer', location: 'Bangalore, Karnataka', logo: 'P', color: '#FCE4EC', category: 'UI/UX Designer' },
    { title: 'Systems Engineer', location: 'Delhi, NCR', logo: 'S', color: '#EFEBE9', category: 'Java Developer' },
    { title: 'Intern - Designer', location: 'Bangalore, Karnataka', logo: 'I', color: '#F1F8E9', category: 'Internship' }
  ];

  displayedJobs = this.allJobs.slice(0, 3);
  isExpanded = false;
  activeFilter = '';

  showModal = false;
  selectedJob: any = null;
  fileName = '';

  filterBy(cat: string) {
    // Navigate to jobs page with search query
    this.router.navigate(['/jobs'], {
      queryParams: { search: cat }
    });
  }

  showMore() {
    // Show maximum 5 jobs
    this.displayedJobs = this.allJobs.filter(j =>
      !this.activeFilter || j.category === this.activeFilter
    ).slice(0, 5);
    this.isExpanded = true;
  }

  showLess() {
    // Show only 3 jobs initially
    this.displayedJobs = this.allJobs.filter(j =>
      !this.activeFilter || j.category === this.activeFilter
    ).slice(0, 3);
    this.isExpanded = false;
    this.activeFilter = '';
  }

  openApplyModal(job: any) {
    this.selectedJob = job;
    this.showModal = true;
    this.fileName = '';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  handleFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.fileName = e.target.files[0].name;
    }
  }

  submitForm(e: any) {
    e.preventDefault();
    alert(`Success! Application submitted for ${this.selectedJob.title}. We will review your profile soon.`);
    this.closeModal();
  }

  infoPopup(title: string, msg: string) {
    alert(`${title}: ${msg}`);
  }

  navigateToJobs(jobType: string) {
    // Navigate to jobs page with filter applied
    this.router.navigate(['/jobs'], {
      queryParams: { jobType: jobType.toLowerCase() }
    });
  }
}

