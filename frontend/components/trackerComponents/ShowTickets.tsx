import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { dateFormatter } from '../../utils/dateFormat';
import ModifierTicket from './modifTicket';

const ShowTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [modifier, setModifier] = useState(false);
  const [ticketToMod, setTicketToMod] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const GetTickets = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`,
          { headers: { 'x-access-token': token } }
        );
        console.log(response);
        setTickets(response.data);
      } catch (error) {
        alert(error);
        setError(error);
      }
    };

    GetTickets();
  }, []);

  const deleteTicket = async ticketId => {
    const token = localStorage.getItem('token');
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/${ticketId}`,
      { headers: { 'x-access-token': token } }
    );
    router.reload();
  };

  const displayModifyPanel = ticket => {
    setTicketToMod(ticket);
    setModifier(true);
  };

  const renderModifyPanel = () => {
    if (modifier) {
      return <ModifierTicket ticket={ticketToMod} />;
    } else {
      return null;
    }
  };

  const handleDelete = ticketId => {
    confirm('êtes vous sur de vouloir supprimer ce ticket ?');

    deleteTicket(ticketId);

    alert(`Ticket ${ticketId} supprimé`);

    router.reload();
  };

  return (
    <div>
      <p className="text-2xl mb-2 underline">Tickets {user.nomUtilisateur} :</p>
      <div className="flex flex-wrap gap-2">
        {tickets.map(ticket => (
          <div
            key={ticket._id}
            className="flex flex-col p-2 gap-2 border border-black rounded-md mb-2
					bg-gray-200 justify-center items-center"
          >
            <p>
              <span className="underline">Titre </span> : {ticket.nomTicket}
            </p>
            <p>
              <span className="underline">description </span> :{' '}
              {ticket.description}
            </p>
            <p>
              <span className="underline">status </span> : {ticket.etat}
            </p>
            <p>
              <span className="underline">priorité </span> : {ticket.priorite}
            </p>
            <p>
              <span className="underline">Temps estimée</span> :{' '}
              {ticket.tempsEstime} heures
            </p>
            <p>
              <span className="underline">Temps Passée</span> :{' '}
              {ticket.tempsPasse} heures
            </p>
            <p>
              <span className="underline">Date de création du ticket</span> :{' '}
              {dateFormatter(ticket.dateCreation)}
            </p>
            <div className="flex flex-row gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => displayModifyPanel(ticket)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(ticket._id)}
              >
                Supprimer
              </button>
            </div>
            {renderModifyPanel()}
          </div>
        ))}
      </div>

      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default ShowTickets;
