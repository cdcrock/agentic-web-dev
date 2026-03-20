import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GitIssue, GitIssuesService } from './git-issues.service';

@Component({
  selector: 'app-git-issues-dashboard',
  templateUrl: './git-issues-dashboard.html',
  styleUrl: './git-issues-dashboard.scss'
})
export class GitIssuesDashboard {
  private readonly gitIssuesService = inject(GitIssuesService);

  protected readonly issues = toSignal(this.gitIssuesService.getIssues(), { initialValue: [] as GitIssue[] });
  protected readonly selectedRepository = signal('all');
  protected readonly selectedStatus = signal('all');
  protected readonly expandedIssueId = signal<number | null>(null);

  protected readonly repositories = computed(() => {
    const repositories = new Set<string>();
    for (const issue of this.issues()) {
      repositories.add(issue.repository);
    }
    return Array.from(repositories);
  });

  protected readonly filteredIssues = computed(() => {
    const selectedRepository = this.selectedRepository();
    const selectedStatus = this.selectedStatus();

    return this.issues().filter(issue => {
      const matchesRepository =
        selectedRepository === 'all' || issue.repository === selectedRepository;
      const matchesStatus =
        selectedStatus === 'all' || issue.status === selectedStatus;
      return matchesRepository && matchesStatus;
    });
  });

  protected onRepositoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRepository.set(value);
  }

  protected onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }

  protected toggleExpanded(issueId: number): void {
    this.expandedIssueId.update(current => (current === issueId ? null : issueId));
  }

  protected isExpanded(issueId: number): boolean {
    return this.expandedIssueId() === issueId;
  }
}
