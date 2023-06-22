/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import LoginPage from '../pages/login';
import LoginForm from '../components/Forms/LoginForm';

// mocks
window.alert = jest.fn();
jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  it('should render the login form', () => {
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });
  it('should render the login form with email and password fields', () => {
    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });
  it('should render the login form with submit buttons (JWT and google)', () => {
    const submitButton = screen.getByTestId('submit-button-login');
    expect(submitButton).toBeInTheDocument();
    const submitButtonGoogle = screen.getByTestId('submit-google');
    expect(submitButtonGoogle).toBeInTheDocument();
  });
  it('should render the login form with a link to the register page', () => {
    const registerLink = screen.getByTestId('register-page-link');
    expect(registerLink).toBeInTheDocument();
  });
  it('should render the login form with a link to the forgot password page', () => {
    const forgotPasswordLink = screen.getByTestId('forgot-password-link');
    expect(forgotPasswordLink).toBeInTheDocument();
  });
});

describe('LoginForm', () => {
  let mockUser: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUser = userEvent.setup();

    render(<LoginForm />);
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

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const submitButton = screen.getByTestId('submit-button-login');

    await act(async () => {
      await mockUser.type(emailField, 'test@example.com');
      await mockUser.type(passwordField, 'password');
      await mockUser.click(submitButton);
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), {
        email: 'test@example.com',
        password: 'password'
      });
    });
  });

  it('should alert if the request fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Vous n'êtes pas connecté")
    );

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const submitButton = screen.getByTestId('submit-button-login');

    await act(async () => {
      await mockUser.type(emailField, 'hello@bye');
      await mockUser.type(passwordField, 'world');
      await mockUser.click(submitButton);
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), {
        email: 'hello@bye',
        password: 'world'
      });
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith("Vous n'êtes pas connecté");
    });
  });
});
