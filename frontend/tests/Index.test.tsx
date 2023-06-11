/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import IndexPage from '../pages/index';
describe('IndexPage', () => {
  it('renders the general elements of the layout', () => {
    render(<IndexPage />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

  it('renders navigation links in the navbar and footer', () => {
    render(<IndexPage />);

    expect(screen.getByTestId('about-link')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
    expect(screen.getByTestId('register-link')).toBeInTheDocument();
    expect(screen.getByTestId('home-link')).toBeInTheDocument();
    expect(screen.getByTestId('footer-link')).toBeInTheDocument();
  });

  it('renders navigation link content correctly', () => {
    render(<IndexPage />);

    expect(screen.getByTestId('about-link')).toHaveTextContent('À propos');
    expect(screen.getByTestId('login-link')).toHaveTextContent('Se connecter');
    expect(screen.getByTestId('register-link')).toHaveTextContent("S'inscrire");
    expect(screen.getByTestId('home-link')).toHaveTextContent('Accueil');
    expect(screen.getByTestId('footer-link')).toHaveAttribute('href', '/');
  });
});
