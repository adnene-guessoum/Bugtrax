import AccueilRedirect from '../components/AccueilRedirect';
import AccueilEspaceUtilisateur from '../components/AccueilEspaceUtilisateur';
import { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = (): JSX.Element => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [user, setUser] = useState({
    nomUtilisateur: '',
    email: '',
    motDePasse: ''
  });

  useEffect(() => {
    try {
      const checkUser = async () => {
        const token = localStorage.getItem('token');

        if (token) {
          const checkResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
            { headers: { 'x-access-token': token } }
          );

          console.log(checkResponse);

          if (checkResponse.data.auth === false) {
            setValidToken(false);
            localStorage.removeItem('token');
          } else {
            setValidToken(true);
            setUser(checkResponse.data);
          }
        }
      };
      checkUser();
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  if (validToken) {
    return <AccueilEspaceUtilisateur user={user} />;
  } else {
    return <AccueilRedirect />;
  }
};

export default IndexPage;
