import React, { useEffect } from 'react';
import Counter from '../util/zustand';

const PageTest: React.FC = () => {
  // Récupère la valeur count et la fonction setCount depuis le store
  const { count, setCount } = Counter();

  // useEffect s'exécute au démarrage (mount) du composant
  useEffect(() => {
    if (count !== 2) {
      setCount(10);
    }
  }, []); // Exécuté une seule fois au montage

  return (
    <div>
      <h1>Zustand</h1>
      <p>{count}</p>
    </div>
  );
};

export default PageTest;





















