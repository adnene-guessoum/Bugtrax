import React from 'react';
import ProfileBanner from './trackerComponents/ProfileBanner';

const AccueilEspaceUtilisateur = ({ user }): JSX.Element => {
  console.log(user);
  return (
    <>
      <ProfileBanner user={user} />
      <div className="flex flex-wrap justify-around items-center gap-2">
        <h2 className="text-2xl">Mes projets</h2>
        <ul className="flex flex-col justify-center items-center gap-2">
          <li>Projet 1</li>
          <li>Projet 2</li>
          <li>Projet 3</li>
        </ul>
      </div>
    </>
  );
};

export default AccueilEspaceUtilisateur;
