import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { PostJobComponent } from './pages/post-job/post-job.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'jobs', component: JobsComponent },
    { path: 'jobs/:id', component: JobDetailComponent },
    { path: 'post-job', component: PostJobComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
