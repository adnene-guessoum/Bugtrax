import React from 'react';
import Layout from '../components/Layout';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

const AboutPage = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2 data-testid="about-title" className="text-4xl font-bold my-2">
          A propos :
        </h2>

        <div
          data-testid="about-project"
          className="text-xl w-full md:w-4/5 lg:w-2/3 my-4 text-justify"
        >
          Cette application est un projet personnel qui a pour but de faciliter
          la recherche et l&apos;annotation de tickets liés à des bugs dans un
          projet informatique. Elle est composée d&apos;un frontend en
          Next/React et d&apos;un backend en Node/Express.
        </div>
        <p className="text-xl font-semibold">
          Vous pouvez trouver le code et les explications du projet sur Github:
        </p>
        <a
          href="https://github.com/adnene-guessoum/Ficher"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="github-link"
          className="flex items-center justify-center px-4 py-2 my-2 text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800"
        >
          <FaGithub className="mr-2" />
          Github
        </a>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2 className="text-4xl font-bold">Technologies :</h2>
        <div className="text-justify">
          <ul className="list-disc list-inside">
            <li>Frontend: Next/React, Typescript, TailwindCSS</li>
            <li>Backend: Node, Express, Mongoose, MongoDB</li>
            <li>Authentification: JWT</li>
            <li>
              Tests, Clean Code: Jest, React Testing Library, ESlint, Prettier
            </li>
            <li>
              CI/CD, Hosting et Divers: Github Actions, Docker, Vercel, MongoDB
              Atlas, ...
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4 border border-black">
          <p className="text-xl font-semibold">
            Besoin d&apos;un dev full-stack ?
          </p>

          <p className="text-xl font-semibold mt-4">Mon Blogfolio :</p>
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <a
              href="https://adnene-dev.vercel.app/"
              target="_blank"
              data-testid="blogfolio-link"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2  text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              <BiLinkExternal className="mr-4" />
              Blogfolio - Adnene Guessoum
            </a>
          </div>
          <p className="text-xl font-semibold">Me Contacter :</p>
          <div className="flex flex-wrap items-center justify-center gap-2 p-4">
            <a
              href="https://twitter.com/GuessoumAdnene"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="twitter-link"
              className="flex items-center justify-center px-4 py-2 text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              <FaTwitter className="mr-2" />
              Twitter
            </a>

            <a
              href="https://www.linkedin.com/in/adnene-guessoum/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="linkedin-link"
              className="flex items-center justify-center px-4 py-2 text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </a>

            <a
              href="mailto:"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="email-link"
              className="flex items-center justify-center px-4 py-2  text-xl font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              <MdEmail className="mr-2" />
              adnen.guessoum@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
