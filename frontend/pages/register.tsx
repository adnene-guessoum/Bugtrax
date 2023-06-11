import RegisterForm from '../components/RegisterForm';
import Layout from '../components/Layout';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4 my-20">
        <h1 className="text-4xl font-bold text-center underline">
          Créer votre compte :
        </h1>
        <RegisterForm />
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2"></div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
