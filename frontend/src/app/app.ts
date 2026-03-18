import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService, HealthStatus } from './health.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Agentic Web Dev');
  protected readonly healthStatus = signal<string>('checking...');
  protected readonly healthError = signal<string | null>(null);

  private readonly healthService = inject(HealthService);

  ngOnInit(): void {
    this.healthService.getHealth().subscribe({
      next: (res: HealthStatus) => this.healthStatus.set(res.status),
      error: () => {
        this.healthStatus.set('UNKNOWN');
        this.healthError.set('Could not reach backend — is it running on port 8080?');
      }
    });
  }
}
