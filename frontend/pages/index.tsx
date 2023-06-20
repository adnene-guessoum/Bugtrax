import AccueilRedirect from '../components/AccueilRedirect';
import Profile from '../components/Profile';
import { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = (): JSX.Element => {
  const [validToken, setValidToken] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const checkResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authCheck`,
          { localToken: token }
        );

        console.log(checkResponse);

        if (!checkResponse.data) {
          setValidToken(false);
        } else {
          setValidToken(true);
        }
      }
    };
    checkToken();
  }, []);

  /* comment: set token to see other render
  useEffect(() => {
    setValidToken(true);
  }, []);
	*/

  if (validToken) {
    return <Profile />;
  } else {
    return <AccueilRedirect />;
  }
};

export default IndexPage;
