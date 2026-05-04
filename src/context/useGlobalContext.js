import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

// Hook personalizado para usar el contexto global
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      'useGlobalContext debe ser usado dentro de GlobalProvider'
    );
  }

  return context;
};
