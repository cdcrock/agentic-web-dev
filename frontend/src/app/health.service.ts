import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HealthStatus {
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly http = inject(HttpClient);

  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>('/api/health');
  }
}
