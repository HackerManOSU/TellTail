import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '../components/Home/Home.tsx';

describe('Home Page', () => {
  it('renders the Home page with correct content', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check for key text elements
    expect(screen.getByText('Identify Your Pets').textContent).toBe('Identify Your Pets');
    expect(screen.getByText('Quick, Easy, Anywhere').textContent).toBe('Quick, Easy, Anywhere');
    expect(screen.getByText('Get Started').textContent).toBe('Get Started');
    expect(screen.getByText('Easily Identify Your Pets').textContent).toBe('Easily Identify Your Pets');
    expect(screen.getByText('Access Anywhere').textContent).toBe('Access Anywhere');
    expect(screen.getByText('Learn More About Your Pet').textContent).toBe('Learn More About Your Pet');
    expect(screen.getByText('Share With Others').textContent).toBe('Share With Others');

    // Check to make sure the images are rendered
    expect(screen.getAllByRole('img').length).toBeGreaterThan(5);
  });
});
