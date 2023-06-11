import React from 'react';
import CustomHead from './CustomHead';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen min-w-320">
      <CustomHead />
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <div className="w-full h-full md:ml-40 min-h-screen">
          <Banner />
          <main className="md:ml-4">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
