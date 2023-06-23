const ShowTickets = ({ user }) => {
  return (
    <div>
      <p>tickets de {user.nomUtilisateur}</p>
      <ul className="flex flex-col justify-center items-center gap-2">
        <li>ticket 1</li>
        <li>ticket 2</li>
        <li>ticket 3</li>
      </ul>
    </div>
  );
};

export default ShowTickets;
