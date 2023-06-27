import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateTicket = () => {
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState({
    nomTicket: '',
    description: '',
    etat: '',
    priorite: '',
    tempsEstime: '',
    tempsPasse: '',
    dateCreation: Date.now()
  });

  const router = useRouter();

  const submitTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`,
        ticket,
        { headers: { 'x-access-token': token } }
      );
      console.log(res);
      alert('Ticket créé !');
      setTicket({
        nomTicket: '',
        description: '',
        etat: '',
        priorite: '',
        tempsEstime: '',
        tempsPasse: '',
        dateCreation: Date.now()
      });

      router.reload();
    } catch (err) {
      setError(err);
      console.log(err);
      alert(err);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTicket({ ...ticket, [id]: value });
    setError('');
  };

  return (
    <div className="mt-4">
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
                  id="description"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="Description du ticket"
                  value={ticket.description}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <input
                  type="text"
                  data-testid="etat-field"
                  id="etat"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="A faire, En cours, Terminé"
                  value={ticket.etat}
                  onChange={handleChangeInput}
                />
              </div>

              <div>
                <input
                  type="text"
                  data-testid="priorite-field"
                  id="priorite"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="Urgent, Normal, Faible"
                  value={ticket.priorite}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <input
                  type="number"
                  data-testid="tempsEstime-field"
                  id="tempsEstime"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="en heures (0.5 = 30 minutes)"
                  value={ticket.tempsEstime}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <input
                  type="number"
                  data-testid="tempsPasse-field"
                  id="tempsPasse"
                  className="bg-gray-300 border border-black p-1"
                  placeholder="en heures (0.5 = 30 minutes)"
                  value={ticket.tempsPasse}
                  onChange={handleChangeInput}
                />
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            data-testid="submit-button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Soumettre
          </button>
          <div className="flex justify-center">
            {<span className="text-red-500">{error}</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
