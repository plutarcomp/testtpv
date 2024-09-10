import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useIsProgramaExist = (programa) => {
  const [programaNotFound, setProgramaNotFound] = useState(false);

  const { data, error } = useQuery({
    queryKey: ['programa', programa],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_AUTH_URL}/programs/findbyurlname/${programa}`);
      return response.json();
    },

  });
  
  useEffect(() => {
    
    if (error) {
      console.error('Error al obtener el programa:', error);
    }
    if (data && data.statusCode === 404) {
      setProgramaNotFound(true);
    }else{
      setProgramaNotFound(false);
    }
  }, [data, error]);

  return { data, error, programaNotFound };
};
