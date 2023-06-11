import React from 'react';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';

const LoginPage = (): JSX.Element => {
  const handlePasswordReset = e => {
    e.preventDefault();
    console.log('reset password');
    alert(
      'Pas de chance, on a pas encore implémenté cette fonctionnalité ! 😅'
    );
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4 my-20">
        <h1 className="text-4xl font-bold text-center underline">
          Se Connecter :
        </h1>
        <LoginForm />
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
          <Link
            href="/register"
            data-testid="register-page-link"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Créer un compte
          </Link>
          <Link
            href="/resetPassword"
            data-testid="forgot-password-link"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePasswordReset}
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
