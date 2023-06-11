const Banner = (): JSX.Element => {
  return (
    <header
      data-testid="banner"
      className="flex flex-col justify-center gap-2 bg-slate-300 h-[10vh]"
    >
      <div className="flex flex-row justify-around items-center gap-2">
        <h1 className="text-red-500 text-2xl underline">Bugtrax</h1>
        <span>Bienvenue</span>
      </div>
    </header>
  );
};

export default Banner;
