import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetTickets = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`
        );
        console.log(response.data);
        console.log('hi');
        setTickets(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    GetTickets();
  }, []);

  return (
    <div>
      <p>tickets de {user.nomUtilisateur}</p>

      {tickets.map(ticket => (
        <div key={ticket.id} className="border border-black">
          <p>{ticket.titre}</p>
          <p>{ticket.description}</p>
          <p>{ticket.etat}</p>
          <p>{ticket.date}</p>
        </div>
      ))}

      <p>{error}</p>
    </div>
  );
};

export default ShowTickets;
