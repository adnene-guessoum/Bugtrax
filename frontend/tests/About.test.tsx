/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import AboutPage from '../pages/about';

describe('AboutPage', () => {
  it('renders the general elements of the layout', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

  it('renders the external links in the about page', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('github-link')).toBeInTheDocument();
    expect(screen.getByTestId('blogfolio-link')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-link')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-link')).toBeInTheDocument();
    expect(screen.getByTestId('email-link')).toBeInTheDocument();
  });

  it('renders information about the project', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('about-project')).toBeInTheDocument();
    expect(screen.getByTestId('about-title')).toBeInTheDocument();
    expect(screen.getByTestId('about-title')).toHaveTextContent('A propos :');
  });
});
