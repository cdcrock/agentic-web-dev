import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})
export class NavMenu {
  protected readonly isOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Home', route: '/' }
  ];

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
