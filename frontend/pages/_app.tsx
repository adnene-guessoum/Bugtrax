import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
