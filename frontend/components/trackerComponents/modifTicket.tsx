import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';

const ModifierTicket = ({ ticket }) => {
  const router = useRouter();

  const submitModifiedTicket = async e => {
    e.preventDefault();

    const modifiedTicket = {
      nomTicket: e.target.nomTicket.value,
      description: e.target.description.value,
      etat: e.target.etat.value,
      priorite: e.target.priorite.value,
      tempsEstime: e.target.tempsEstime.value,
      tempsPasse: e.target.tempsPasse.value,
      dateCreation: ticket.dateCreation
    };
    console.log(modifiedTicket);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/${ticket._id}`,
        modifiedTicket,
        { headers: { 'x-access-token': token } }
      );
      console.log(response);
      alert('Ticket modifié');
      router.reload();
    } catch (err) {
      console.log(err);
      alert(`ABANDON -> Erreur lors de la modification du ticket: ${err}`);
      router.reload();
    }
  };

  const handleCancelModifyTicket = e => {
    e.preventDefault();
    router.reload();
  };

  return (
    <div className="z-20 absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center border-2 border-black ">
      <div className="bg-white p-4 rounded-md">
        <p className="text-2xl mb-2 underline">
          Modifier le ticket &quot;{ticket._id}&quot; :
        </p>
        <form data-testid="create-ticket-form" onSubmit={submitModifiedTicket}>
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
                    defaultValue={ticket.nomTicket}
                  />
                </div>
                <div>
                  <input
                    type="textarea"
                    data-testid="description-field"
                    id="description"
                    className="bg-gray-300 border border-black p-1"
                    defaultValue={ticket.description}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    data-testid="etat-field"
                    id="etat"
                    className="bg-gray-300 border border-black p-1"
                    defaultValue={ticket.etat}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    data-testid="priorite-field"
                    id="priorite"
                    className="bg-gray-300 border border-black p-1"
                    defaultValue={ticket.priorite}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    data-testid="tempsEstime-field"
                    id="tempsEstime"
                    className="bg-gray-300 border border-black p-1"
                    defaultValue={ticket.tempsEstime}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    data-testid="tempsPasse-field"
                    id="tempsPasse"
                    className="bg-gray-300 border border-black p-1"
                    defaultValue={ticket.tempsPasse}
                  />
                </div>
              </fieldset>
            </div>
            <button
              type="submit"
              data-testid="submit-button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Modifier
            </button>
            <button
              type="button"
              data-testid="cancel-mod-button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancelModifyTicket}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierTicket;
