import React, { useState } from 'react';

const CreateTicket = () => {
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState({
    nomTicket: '',
    description: '',
    etat: '',
    dateCreation: '',
    prorite: '',
    tempsEstime: '',
    tempsPasse: ''
  });

  const submitTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`,
        ticket
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTicket({ ...ticket, [id]: value });
    setError('');
  };

  return (
	<>
	 <div>Ajout Tickets</div>;
	 <form data-testid="create-ticket-form" onSubmit={submitTicket}>
	 	<div className="flex flex-col p-2 gap-2 border border-black">
			<div className="flex p-2 gap-8 border border-black">
          <fieldset className="flex flex-col justify-around gap-2">
            <label htmlFor="nomTicket">Titre ticket:</label>
            <label htmlFor="description">description :</label>
            <label htmlFor="etat">etat :</label>
            <label htmlFor="priorite">priorité :</label>
            <label htmlFor="tempsEstime">temps estimé :</label>
            <label htmlFor="tempsPasse">temps passé :</label>
          </fieldset>

          <fieldset className="flex flex-col justify-around gap-2">
            <div>
              <input
                type="text"
                data-testid="nomTicket-field"
                id="nomTicket"
                className="bg-gray-300 border border-black p-1"
                placeholder="Titre du ticket"
                value={ticket.nomTicket}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <input
                type="textarea"
                data-testid="description-field"
                id="email"
                className="bg-gray-300 border border-black p-1"
                placeholder="john.doe@mail.com"
                value={user.email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <input
                type="password"
                data-testid="password-field-register"
                id="password"
                className="bg-gray-300 border border-black p-1"
                placeholder="********"
                value={user.password}
                onChange={handleChangeInput}
              />
            </div>
          </fieldset>
        </div>

	 	
	</>

)
};

export default CreateTicket;
