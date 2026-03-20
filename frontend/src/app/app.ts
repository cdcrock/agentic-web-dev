import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from './nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Agentic Web Dev');
  protected readonly landingMessage = signal('This is a temporary message for the landing page');
}
