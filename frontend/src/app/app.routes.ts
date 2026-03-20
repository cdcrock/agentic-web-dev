import { Routes } from '@angular/router';
import { GitIssuesDashboard } from './git-issues-dashboard/git-issues-dashboard';

export const routes: Routes = [
	{ path: '', redirectTo: 'git-issues', pathMatch: 'full' },
  { path: 'git-issues', component: GitIssuesDashboard }
];
