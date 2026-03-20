import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GitIssuesDashboard } from './git-issues-dashboard';
import { GitIssuesService } from './git-issues.service';

describe('GitIssuesDashboard', () => {
  let fixture: ComponentFixture<GitIssuesDashboard>;

  beforeEach(async () => {
    const gitIssuesServiceStub = {
      getIssues: () => of([
        {
          id: 8,
          title: 'Git Issues page',
          repository: 'agentic-web-dev',
          status: 'open',
          number: 8,
          comments: 0,
          labels: ['enhancement'],
          url: 'https://github.com/cdcrock/agentic-web-dev/issues/8'
        }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [GitIssuesDashboard],
      providers: [{ provide: GitIssuesService, useValue: gitIssuesServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(GitIssuesDashboard);
    fixture.detectChanges();
  });

  it('should render repository and status filters', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const repositoryFilter = compiled.querySelector('[data-testid="repository-filter"]') as HTMLSelectElement;
    const statusFilter = compiled.querySelector('[data-testid="status-filter"]') as HTMLSelectElement;

    expect(repositoryFilter).toBeTruthy();
    expect(statusFilter).toBeTruthy();
  });

  it('should include an all repositories option in the repository filter', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const repositoryFilter = compiled.querySelector('[data-testid="repository-filter"]') as HTMLSelectElement;
    const options = Array.from(repositoryFilter.options).map(option => option.textContent?.trim());

    expect(options).toContain('All repositories');
  });

  it('should expand an issue card and show supplementary issue details when clicked', () => {
    const issueCard = fixture.debugElement.query(By.css('[data-testid="issue-card"]'));

    issueCard.nativeElement.click();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="issue-number"]')?.textContent).toContain('#8');
    expect(compiled.querySelector('[data-testid="issue-comments"]')?.textContent).toContain('0');
    expect(compiled.querySelector('[data-testid="issue-labels"]')?.textContent).toContain('enhancement');
  });
});