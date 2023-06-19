import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex flex-col gap-4 justify-center items-center mt-12">
        <h2 className="underline font-semibold text-2xl">
          Veuillez vous connecter
        </h2>
        <Link href="/login">
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Connexion
            </button>
          </div>
        </Link>

        <Link href="/register">
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Inscription
            </button>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
