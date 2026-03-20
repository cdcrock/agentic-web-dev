import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavMenu } from './nav-menu';

describe('NavMenu', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenu],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(NavMenu);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with the menu closed', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.nav-menu')?.classList).not.toContain('open');
  });

  it('should open the menu when toggleMenu is called', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    component.toggleMenu();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).toContain('open');
  });

  it('should close the menu when toggleMenu is called twice', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    component.toggleMenu();
    fixture.detectChanges();
    component.toggleMenu();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).not.toContain('open');
  });

  it('should close the menu when closeMenu is called', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    component.toggleMenu();
    fixture.detectChanges();
    component.closeMenu();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).not.toContain('open');
  });

  it('should set aria-expanded on the hamburger button to reflect menu state', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const button = compiled.querySelector('.hamburger') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');

    component.toggleMenu();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close the menu when a nav item is clicked', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    component.toggleMenu();
    fixture.detectChanges();

    const navItem = compiled.querySelector('.nav-item') as HTMLAnchorElement;
    navItem.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).not.toContain('open');
  });

  it('should toggle the menu when the hamburger button is clicked', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const button = compiled.querySelector('.hamburger') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).toContain('open');

    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.nav-menu')?.classList).not.toContain('open');
  });

  it('should render a Git Issues nav item', () => {
    const fixture = TestBed.createComponent(NavMenu);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const navItems = Array.from(compiled.querySelectorAll('.nav-item'));
    const gitIssuesLink = navItems.find(item => item.textContent?.trim() === 'Git Issues');

    expect(gitIssuesLink).toBeTruthy();
    expect(gitIssuesLink?.getAttribute('href')).toContain('/git-issues');
  });
});
