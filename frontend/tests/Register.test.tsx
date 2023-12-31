/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import RegisterPage from '../pages/register';
import RegisterForm from '../components/Forms/RegisterForm';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/dom';

// mocks
window.alert = jest.fn();
jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe('RegisterPage', () => {
  it('should render the register form', () => {
    render(<RegisterPage />);
    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();
  });

  it('should render the register form with username, email and password fields', () => {
    render(<RegisterPage />);
    const emailField = screen.getByTestId('email-field-register');
    const passwordField = screen.getByTestId('motDePasse-field-register');
    const usernameField = screen.getByTestId('nomUtilisateur-field-register');
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
  });
  it('should render the register form with a submit button', () => {
    render(<RegisterPage />);
    const submitButton = screen.getByTestId('submit-button-register');
    expect(submitButton).toBeInTheDocument();
  });
});

describe('RegisterForm', () => {
  let mockUser: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUser = userEvent.setup();

    render(<RegisterForm />);
  });

  it('should submit form with user creds', async () => {
    const mockResponse = {
      data: {
        token: 'testToken',
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          createdAt: '2021-04-20T20:20:20.202Z',
          updatedAt: '2021-04-20T20:20:20.202Z'
        }
      },
      status: 200,
      statusText: 'OK'
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const usernameField = screen.getByTestId('nomUtilisateur-field-register');
    const emailField = screen.getByTestId('email-field-register');
    const passwordField = screen.getByTestId('motDePasse-field-register');
    const submitButton = screen.getByTestId('submit-button-register');

    await act(async () => {
      await mockUser.type(usernameField, 'test');
      await mockUser.type(emailField, 'test@example.com');
      await mockUser.type(passwordField, 'password');
      await mockUser.click(submitButton);
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), {
        nomUtilisateur: 'test',
        email: 'test@example.com',
        motDePasse: 'password'
      });
    });
  });

  it('should alert if the request fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Une erreur est survenue lors de l'inscription")
    );

    const usernameField = screen.getByTestId('nomUtilisateur-field-register');
    const emailField = screen.getByTestId('email-field-register');
    const passwordField = screen.getByTestId('motDePasse-field-register');
    const submitButton = screen.getByTestId('submit-button-register');

    await act(async () => {
      await mockUser.type(usernameField, 'test');
      await mockUser.type(emailField, 'hello@bye');
      await mockUser.type(passwordField, 'world');
      await mockUser.click(submitButton);
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), {
        nomUtilisateur: 'test',
        email: 'hello@bye',
        motDePasse: 'world'
      });
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(
        "Une erreur est survenue lors de l'inscription (client)"
      );
    });
  });
});
