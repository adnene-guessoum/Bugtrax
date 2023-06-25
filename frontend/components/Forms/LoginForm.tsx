import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    motDePasse: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          email: user.email,
          motDePasse: user.motDePasse
        }
      );
      setUser({ email: '', motDePasse: '' });
      localStorage.setItem('token', res.data.token);
      alert('Vous êtes connecté');
      router.push('/');
    } catch (err) {
      setError(
        `une erreur est survenue lors de l'authentification. Vérifiez que votre email et votre mot de passe sont corrects et que vous êtes bien inscrit`
      );
      alert("Vous n'êtes pas connecté");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    setError('');
  };

  const handleInvitéLogin = async () => {
    try {
      console.log('login as invite');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          email: 'invite@mail.com',
          motDePasse: 'invite'
        }
      );
      localStorage.setItem('token', res.data.token);
      alert("Vous êtes connecté en tant qu'invité");
      router.push('/');
    } catch (err) {
      console.log(err);
      console.log(
        `une erreur est survenue lors de l'authentification. Veuillez-nous excuser pour la gêne occasionnée`
      );
      alert("Vous n'êtes pas connecté, dsl");
    }
  };

  return (
    <>
      <form data-testid="login-form" onSubmit={loginSubmit}>
        <div className="flex flex-col p-2 gap-2 border border-black">
          <div className="flex p-2 gap-8 border border-black">
            <fieldset className="flex flex-col justify-around gap-2">
              <label htmlFor="email">Votre addresse mail :</label>
              <label htmlFor="motDePasse">Mot de Passe :</label>
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
                  data-testid="motDePasse-field"
                  id="motDePasse"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="********"
                  value={user.motDePasse}
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
        </div>
      </form>
      <button
        data-testid="submit-invité"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleInvitéLogin}
      >
        Se connecter comme invité
      </button>
    </>
  );
};

export default LoginForm;
