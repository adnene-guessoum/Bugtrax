import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTickets = ({ user }) => {
  const [tickets, setTickets] = useState({});
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

  return (
    <div>
      <p className="text-2xl mb-2">tickets de {user.nomUtilisateur}</p>
      <div className="flex flex-wrap p-2 gap-2 border border-black">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="flex flex-wrap p-2 gap-2 border border-black"
          >
            <p>{ticket.nomTicket}</p>
            <p>{ticket.description}</p>
            <p>{ticket.etat}</p>
            <p>{ticket.priorite}</p>
            <p>{ticket.tempsEstime}</p>
            <p>{ticket.tempsPasse}</p>
            <p>{ticket.dateCreation}</p>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500">
          Erreur lors de la récupération des tickets
        </p>
      )}
    </div>
  );
};

export default ShowTickets;
