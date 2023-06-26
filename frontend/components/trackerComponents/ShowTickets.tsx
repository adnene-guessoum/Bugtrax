import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

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
        console.log(error);
        setError(error);
      }
    };

    GetTickets();
  }, []);

  console.log(tickets);

  const handleModify = () => {
    alert('modifier');
  };

  const handleDelete = () => {
    alert('supprimer');
  };

  return (
    <div>
      <p className="text-2xl mb-2 underline">Tickets {user.nomUtilisateur} :</p>
      <div className="flex flex-wrap gap-2">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
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
              {ticket.dateCreation}
            </p>
            <div className="flex flex-row gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleModify}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default ShowTickets;
