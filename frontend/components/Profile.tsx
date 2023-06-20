import React from 'react';
import Link from 'next/link';

const Profile = (): JSX.Element => {
  return (
    <div data-testid="profile">
      <h1>Profile</h1>
      <Link href="/">Go home</Link>
    </div>
  );
};

export default Profile;
