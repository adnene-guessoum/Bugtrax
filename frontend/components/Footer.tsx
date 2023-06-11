import Link from 'next/link';

const Footer = (): JSX.Element => {
  return (
    <footer
      data-testid="footer"
      className="flex border border-black text-black sticky top-[100vh] h-[5vh] py-4"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          data-testid="footer-link"
          className="text-xl font-bold hite hover:text-gray-300"
        >
          Bugtrax
        </Link>
        <p className="py-2 sm:py-0">
          copyleft 2023, made with ❤️ by{' '}
          <a
            href="https://adnene-dev.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Adnene Guessoum
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
