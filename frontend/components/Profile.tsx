import React from 'react';
import Link from 'next/link';

const Profile = ({ user }): JSX.Element => {
  console.log(user);
  return (
    <>
      <header
        data-testid="banner-profile"
        className="flex flex-wrap justify-around bg-slate-300 h-[10vh]"
      >
        <div className="flex justify-around items-center gap-2">
          <div>
            <h1 className="text-4xl underline">
              Bienvenue {user.nomUtilisateur}
            </h1>{' '}
          </div>
          <nav className="flex flex-row justify-around items-center gap-2 border-black border-2 bg-gray-200 h-[10vh] px-4 mx-4">
            <ul className="flex flex-row justify-around items-center gap-4">
              <li></li>
              <li></li>
            </ul>

            <div className="flex flex-row justify-around items-center">
              <Link href="/">Se déconnecter</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex flex-wrap justify-around items-center gap-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">Mes projets</h2>
          <ul className="flex flex-col justify-center items-center gap-2">
            <li>Projet 1</li>
            <li>Projet 2</li>
            <li>Projet 3</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">Mes tickets</h2>
          <ul className="flex flex-col justify-center items-center gap-2">
            <li>Ticket 1</li>
            <li>Ticket 2</li>
            <li>Ticket 3</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Profile;
