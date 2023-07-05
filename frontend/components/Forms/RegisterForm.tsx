import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from '../items/Spinner';

const RegisterForm = (): JSX.Element => {
  const [user, setUser] = useState({
    nomUtilisateur: '',
    email: '',
    motDePasse: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const _response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`,
        user
      );
      alert('Vous êtes inscrit');
      router.push('/login');
    } catch (err) {
      setError("une erreur est survenue lors de l'inscription");
      setLoading(false);
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
            <label htmlFor="nomUtilisateur">Nom d&apos;utilisateur :</label>
            <label htmlFor="email">Email :</label>
            <label htmlFor="motDePasse">Mot de Passe :</label>
          </fieldset>

          <fieldset className="flex flex-col justify-around gap-2">
            <div>
              <input
                type="text"
                data-testid="nomUtilisateur-field-register"
                id="nomUtilisateur"
                className="bg-gray-300 border border-black p-1"
                placeholder="John Doe"
                value={user.nomUtilisateur}
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
                data-testid="motDePasse-field-register"
                id="motDePasse"
                className="bg-gray-300 border border-black p-1"
                placeholder="********"
                value={user.motDePasse}
                onChange={handleChangeInput}
              />
            </div>
          </fieldset>
        </div>
        <button
          data-testid="submit-button-register"
          type="submit"
          className="border border-black p-2 hover:bg-gray-300"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Créer un compte'}
        </button>
        <div>{error}</div>
      </div>
    </form>
  );
};

export default RegisterForm;
