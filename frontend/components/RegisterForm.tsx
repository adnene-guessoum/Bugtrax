import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = (): JSX.Element => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const _response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`,
        user
      );
      alert('Vous êtes inscrit');
    } catch (err) {
      setError("une erreur est survenue lors de l'inscription");
      alert("Une erreur est survenue lors de l'inscription (client)");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    setError('');
  };

  return (
    <form data-testid="register-form" onSubmit={registerSubmit}>
      <div className="flex flex-col p-2 gap-2 border border-black">
        <div className="flex p-2 gap-8 border border-black">
          <fieldset className="flex flex-col justify-around gap-2">
            <label htmlFor="username">Nom d&apos;utilisateur :</label>
            <label htmlFor="email">Email :</label>
            <label htmlFor="password">Mot de Passe :</label>
          </fieldset>

          <fieldset className="flex flex-col justify-around gap-2">
            <div>
              <input
                type="text"
                data-testid="username-field-register"
                id="username"
                className="bg-gray-300 border border-black p-1"
                placeholder="John Doe"
                value={user.username}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <input
                type="email"
                data-testid="email-field-register"
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
                data-testid="password-field-register"
                id="password"
                className="bg-gray-300 border border-black p-1"
                placeholder="********"
                value={user.password}
                onChange={handleChangeInput}
              />
            </div>
          </fieldset>
        </div>
        <button
          data-testid="submit-button-register"
          type="submit"
          className="border border-black p-2 hover:bg-gray-300"
        >
          Créer un compte
        </button>
        <div>{error}</div>
      </div>
    </form>
  );
};

export default RegisterForm;
