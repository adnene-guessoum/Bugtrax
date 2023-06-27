import axios from 'axios';

export const checkUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  const checkResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
    { headers: { 'x-access-token': token } }
  );

  if (checkResponse.data.auth === false) {
    return false;
  } else {
    console.log(checkResponse);
    return checkResponse;
  }
};
