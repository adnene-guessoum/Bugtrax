import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
  let BackendUrl;
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod') {
    BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  } else {
    BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_PROD;
  }
*/

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/login`,
        {
          email: user.email,
          password: user.password
        }
      );
      setUser({ name: '', email: '', password: '' });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      alertLogin();
    } catch (err) {
      setError("une erreur est survenue lors de l'authentification");
      alertLogin();
    }
  };

  const alertLogin = () => {
    if (isLoggedIn) {
      alert('Vous êtes connecté');
    } else {
      alert("Vous n'êtes pas connecté");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    setError('');
  };

  return (
    <form data-testid="login-form" onSubmit={loginSubmit}>
      <div className="flex flex-col p-2 gap-2 border border-black">
        <div className="flex p-2 gap-8 border border-black">
          <fieldset className="flex flex-col justify-around gap-2">
            <label htmlFor="email">Votre addresse mail :</label>
            <label htmlFor="password">Mot de Passe :</label>
          </fieldset>

          <fieldset className="flex flex-col justify-around gap-2">
            <div>
              <input
                type="email"
                data-testid="email-field"
                id="email"
                className="bg-gray-300 border border-black p-1"
                placeholder="john.doe@mail.com"
                value={user.email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <input
                type="password"
                data-testid="password-field"
                id="password"
                className="bg-gray-300 border border-black p-1"
                placeholder="********"
                value={user.password}
                autoComplete="true"
                onChange={handleChangeInput}
              />
            </div>
          </fieldset>
          <button
            type="submit"
            data-testid="submit-button-login"
            className="border border-black p-2 hover:bg-gray-300"
          >
            Se connecter
          </button>
        </div>
        <div className="text-red-500">{error}</div>
        <button
          data-testid="submit-google"
          type="submit"
          className="border border-black p-2 hover:bg-gray-300"
        >
          Se connecter avec Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
