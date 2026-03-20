import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface GitIssue {
  id: number;
  title: string;
  repository: string;
  status: string;
  number: number;
  comments: number;
  labels: string[];
  url: string;
}

interface GitIssuesResponse {
  issues: GitIssue[];
}

@Injectable({
  providedIn: 'root'
})
export class GitIssuesService {
  private readonly http = inject(HttpClient);

  getIssues(repository?: string, status?: string): Observable<GitIssue[]> {
    let params = new HttpParams();
    if (repository) {
      params = params.set('repository', repository);
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http
      .get<GitIssuesResponse>('/api/git-issues', { params })
      .pipe(map(response => response.issues));
  }
}
