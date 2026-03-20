import { routes } from './app.routes';

describe('app routes', () => {
  it('should include a route for the git issues dashboard', () => {
    expect(routes.some(route => route.path === 'git-issues')).toBe(true);
  });
});