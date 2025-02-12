import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-gray-800 p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between">


        {/* -----------1 Début logo et paragraphe */}
        <div className="flex flex-col items-center md:items-start p-6">
          <img
            src="/logoNeth.png"
            alt="Logo de l'entreprise"
            className="h-12 mb-2"
          />
          <p className="text-sm text-gray-400 max-w-xs">
            Platforme pour les entrepreneurs dans la création et la gestion de leur entreprise. 
            L'objectif est de simplifier les démarches, optimiser le temps et automatiser 
            les tâches pour ce concentrer sur l’essentiel.
          </p>
        </div>

        {/* -----------2 Début contact  */}
        <div className="flex flex-col items-center md:items-center p-6">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p className="text-sm text-gray-400">Nethelvetic</p>
          <p className="text-sm text-gray-400">1872 Troistorrents</p>
          <a
            href="/contact-form"
            className="text-sm text-blue-400 hover:underline" >
            Formulaire de contact
          </a>
        </div>

        {/* -----------3 Début réseau sociaux */}
        <div className="flex flex-col items-center md:items-end p-6">
          <h2 className="text-lg font-bold mb-2">Suivez-moi</h2>
          <a
            href="https://twitter.com"
            className="text-sm text-gray-400 hover:text-gray-300 hover:underline">
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="text-sm text-gray-400 hover:text-gray-300 hover:underline">
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            className="text-sm text-gray-400 hover:text-gray-300 hover:underline">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
