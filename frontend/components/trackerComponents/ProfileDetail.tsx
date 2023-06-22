const ProfileDetail = ({ user }): JSX.Element => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <ul className="flex flex-col justify-center items-center gap-2">
          <li>{user.nomUtilisateur}</li>
          <li>{user.email}</li>
          <li>{user.role}</li>
          <li>{user.dateCreation}</li>
        </ul>
      </div>
    </>
  );
};

export default ProfileDetail;
