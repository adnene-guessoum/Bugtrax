import { useRouter } from 'next/router';

const ProfileBanner = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    event.preventDefault();
    const check = confirm('Voulez-vous vraiment vous déconnecter ?');

    if (!check) return;
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header
      data-testid="banner-profile"
      className="bg-slate-300 h-[10vh] flex justify-around items-center"
    >
      <h1 className="text-4xl underline">Bienvenue {user.nomUtilisateur}</h1>{' '}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </header>
  );
};

export default ProfileBanner;
