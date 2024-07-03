import { useState, useEffect } from 'react';

const useFetchIPFSData = (ipfsUrl: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ipfsUrl) return;

    const modifiedUrl = ipfsUrl.replace('ipfs://', 'https://minter.mypinata.cloud/ipfs/');
    setIsLoading(true);
    fetch(modifiedUrl)
      .then(response => response.json())
      .then((parsedData) => {
        setData(parsedData);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      });
  }, [ipfsUrl]);

  return { data, isLoading, error };
};

export default useFetchIPFSData;