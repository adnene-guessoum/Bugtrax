import Link from 'next/link';

const Navbar = (): JSX.Element => {
  return (
    <nav
      data-testid="navbar"
      className="flex flex-wrap min-w-fit bg-slate-200 md:h-screen md:fixed md:left-0 md:top-0 md:z-[10] px-4 py-4"
    >
      <div className="flex flex-wrap md:flex-col md:justify-start md:gap-12 md:mt-24 md:items-center justify-center items-center">
        <ul className="flex flex-wrap md:flex-col md:items-center">
          <li className="mr-3">
            <Link
              href="/"
              data-testid="home-link"
              className="inline-block py-2 px-4 text-gray-700 hover:text-gray-900 no-underline"
            >
              Accueil
            </Link>
          </li>
          <li className="mr-3">
            <Link
              href="/about"
              data-testid="about-link"
              className="inline-block py-2 px-4 text-gray-900 hover:text-gray-700 no-underline"
            >
              À propos
            </Link>
          </li>
        </ul>
        <ul className="flex flex-wrap md:flex-col md:items-center">
          <li className="mr-3">
            <Link
              href="/login"
              data-testid="login-link"
              className="inline-block py-2 px-4 text-gray-900 hover:text-gray-700 no-underline"
            >
              Se connecter
            </Link>
          </li>
          <li className="mr-3">
            <Link
              href="/register"
              data-testid="register-link"
              className="inline-block py-2 px-4 text-gray-900 hover:text-gray-700 no-underline"
            >
              S&apos;inscrire
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
