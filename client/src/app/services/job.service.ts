import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);

    getJobs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/jobs`);
    }

    getJobById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/jobs/${id}`);
    }

    getTopJobs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/jobs/top`);
    }

    createJob(job: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/jobs`, job);
    }

    applyForJob(jobId: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/applications`, { job_id: jobId, ...data });
    }
}
