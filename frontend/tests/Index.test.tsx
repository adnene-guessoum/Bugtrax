/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import IndexPage from '../pages/index';
import axios from 'axios';
import { waitFor } from '@testing-library/dom';

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

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

  it('renders the profile content when logged in', async () => {
    const mockCheckResponse = {
      data: {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    };

    axios.post = jest.fn().mockResolvedValue(mockCheckResponse);

    render(<IndexPage />);

    waitFor(() => {
      expect(screen.getByTestId('profile')).toBeInTheDocument();
    });
  });

  it('renders the redirect page when not logged in', async () => {
    const mockCheckResponse = {};

    axios.post = jest.fn().mockResolvedValue(mockCheckResponse);

    render(<IndexPage />);

    waitFor(() => {
      expect(screen.getByTestId('accueil-redirect')).toBeInTheDocument();
    });
  });
});
