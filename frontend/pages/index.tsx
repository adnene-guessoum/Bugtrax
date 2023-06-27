import AccueilRedirect from '../components/AccueilRedirect';
import AccueilEspaceUtilisateur from '../components/AccueilEspaceUtilisateur';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const IndexPage = (): JSX.Element => {
  const [validToken, setValidToken] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [user, setUser] = useState({
    nomUtilisateur: '',
    email: '',
    motDePasse: ''
  });

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setValidToken(false);
          setExpired(false);
          return;
        }

        const checkResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
          { headers: { 'x-access-token': token } }
        );

        setValidToken(true);
        setExpired(false);
        setUser(checkResponse.data);
      } catch (error: any) {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          alert(
            "Votre session a expiré, vous allez être redirigé vers la page d'accueil. Veuillez vous reconnecter."
          );
          setValidToken(false);
          setExpired(true);
        } else {
          console.log(error);
          localStorage.removeItem('token');
        }
      }
    };
    checkUser();
  }, []);

  const loginRedirect = router => {
    router.push('/login');
  };

  if (validToken) {
    return <AccueilEspaceUtilisateur user={user} />;
  } else if (expired) {
    return <>{loginRedirect(router)}</>;
  } else {
    return <AccueilRedirect />;
  }
};

export default IndexPage;
