import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';

function renderAbout() {
  return render(<MemoryRouter><AboutPage /></MemoryRouter>);
}

describe('AboutPage', () => {
  it('renders main heading', () => {
    renderAbout();
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent(/made by hand/i);
  });

  it('renders all four values', () => {
    renderAbout();
    expect(screen.getByText(/full-grain leather only/i)).toBeInTheDocument();
    expect(screen.getByText(/one artisan, one bag/i)).toBeInTheDocument();
    expect(screen.getByText(/vegetable-tanned/i)).toBeInTheDocument();
    expect(screen.getByText(/solid brass hardware/i)).toBeInTheDocument();
  });

  it('shop CTA links to /shop', () => {
    renderAbout();
    const link = screen.getByRole('link', { name: /shop the collection/i });
    expect(link).toHaveAttribute('href', '/shop');
  });
});