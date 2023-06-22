import AccueilRedirect from '../components/AccueilRedirect';
import Profile from '../components/Profile';
import { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = (): JSX.Element => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    try {
      const checkToken = async () => {
        const token = localStorage.getItem('token');

        if (token) {
          const checkResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
            { headers: { 'x-access-token': token } }
          );

          console.log(checkResponse);

          if (!checkResponse.data) {
            setValidToken(false);
          } else {
            setValidToken(true);
            setUser(checkResponse.data);
          }
        }
      };
      checkToken();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  /* comment: set token to see other render
  useEffect(() => {
    setValidToken(true);
  }, []);
	*/

  if (validToken) {
    return <Profile user={user} />;
  } else {
    return <AccueilRedirect />;
  }
};

export default IndexPage;
