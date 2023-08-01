import React from 'react';
import ProfileBanner from './trackerComponents/ProfileBanner';
import CreateTicket from './trackerComponents/CreateTicket';
import ShowTickets from './trackerComponents/ShowTickets';
import { IUser } from '../types/custom.d';
import { dateFormatter } from '../utils/dateFormat';

const AccueilEspaceUtilisateur: React.FC<{ user: IUser }> = ({ user }) => {
  const initialState = {
    profile: true,
    tickets: true,
    addTicket: true
  };

  const [hidden, setHidden] = React.useState(initialState);

  const dateInscription = dateFormatter(user.dateCreation);

  const handleClick = e => {
    const section = e.target.getAttribute('data-section');
    setHidden({
      ...hidden,
      [section]: !hidden[section]
    });
  };

  return (
    <>
      <ProfileBanner user={user} />
      <nav
        className="flex flex-row justify-around items-center gap-2 border-black border-2 bg-gray-200 p-4"
        id="section-nav"
      >
        <ul className="flex flex-row justify-around items-center gap-4">
          <li>
            <input
              type="checkbox"
              id="activate-profile"
              className="border-black focus:bg-blue-300 ml-3"
              onClick={handleClick}
              data-section="profile"
            />
            <label htmlFor="activate-profile">
              <span className="hover:underline ml-2">Mon profil</span>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="activate-tickets"
              className="border-black focus:bg-blue-300 ml-3"
              onClick={handleClick}
              data-section="tickets"
            />
            <label htmlFor="activate-tickets">
              <span className="hover:underline ml-2">Mes tickets</span>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="activate-add-ticket"
              className="border-black focus:bg-blue-300 ml-3"
              onClick={handleClick}
              data-section="addTicket"
            />
            <label htmlFor="activate-add-ticket">
              <span className="hover:underline ml-2">Ajouter un ticket</span>
            </label>
          </li>
        </ul>
      </nav>
      <div
        className={`flex flex-col border-black border-2 p-4 m-4
				justify-center items-center gap-2 ${hidden.profile ? 'hidden' : ''}`}
        data-testid="profile-section"
        id="profile"
      >
        <h1 className="text-2xl">Mon profile</h1>
        <ul className="flex flex-col justify-center items-center gap-2">
          <li>
            <span className="underline">Utilisateur </span> :{' '}
            {user.nomUtilisateur}
          </li>
          <li>
            <span className="underline">addresse mail </span> : {user.email}
          </li>
          <li>
            <span className="underline">rôle </span> : {user.role}
          </li>
          <li>
            <span className="underline">Date d&apos;inscription </span> :{' '}
            {dateInscription}
          </li>
        </ul>
      </div>
      <div
        className={`flex flex-col border-black border-2 p-4 m-4
				justify-center items-center gap-2 ${hidden.tickets ? 'hidden' : ''}`}
        data-testid="tickets-section"
        id="tickets"
      >
        <h1 className="text-2xl">Mes tickets</h1>
        <ShowTickets user={user} />
      </div>
      <div
        className={`flex flex-col border-black border-2 p-4 m-4
				justify-center items-center gap-2 ${hidden['addTicket'] ? 'hidden' : ''}`}
        data-testid="add-ticket-section"
        id="addTicket"
      >
        <h1 className="text-2xl">Ajouter un ticket</h1>
        <CreateTicket />
      </div>
    </>
  );
};

export default AccueilEspaceUtilisateur;
