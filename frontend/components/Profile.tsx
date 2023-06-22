import React from 'react';
import Link from 'next/link';

const Profile = ({ user }): JSX.Element => {
  return (
    <div data-testid="profile">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Link href="/">Go home</Link>
    </div>
  );
};

export default Profile;
