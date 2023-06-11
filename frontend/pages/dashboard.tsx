import React from 'react';
import Layout from '../components/Layout';

const DashboardPage = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
    </Layout>
  );
};

export default DashboardPage;
