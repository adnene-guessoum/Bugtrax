import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowTickets = ({ user }) => {
  const [tickets, setTickets] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetTickets = async () => {
      try {
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`);
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

  console.log(tickets);

  return (
    <div>
      <p>tickets de {user.nomUtilisateur}</p>
      {error && <p>Erreur lors de la récupération des tickets</p>}
    </div>
  );
};

export default ShowTickets;
