import { useEffect, useState } from 'react';
import { BaseError } from 'viem';
import { useContractRead } from 'wagmi';
import Erc721 from '../Contact/Erc721-demo.json'
import { Typography } from '@mui/material';
import useFetchIPFSData from '../hooks/useFetchIPFSData'
import Image from 'next/image'

export function ReadContract() {
  return (
    <div>
      <TokenURI />
    </div>
  );
}

const TokenURI = () => {
  const [tokenId, setTokenId] = useState<number | undefined>(undefined);
  const [value, setValue] = useState<number | undefined>(tokenId);

  const { data: ipfsData, error, isLoading, isSuccess } = useContractRead({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",
    abi: Erc721.abi,
    functionName: 'tokenURI',
    args: [tokenId],
    enabled: Boolean(tokenId),
  });

  const { data: fetchedData, isLoading: isDataLoading, error: dataError } = useFetchIPFSData(ipfsData as string);

  useEffect(() => {
    console.log(ipfsData);
    console.log(error);
    console.log(fetchedData);
    console.log(dataError);
  }, [ipfsData, error, fetchedData, dataError]);


  return (
    <div>
      <Typography
        sx={{
          color: 'white'
        }}>
        read contract Token id:
      </Typography>
      <input
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="tokenId"
        style={{ marginLeft: 4 }}
        value={value || ''}
      />
      <button onClick={() => setTokenId(value)}>{isLoading ? 'fetching...' : 'fetch'}</button>
      {isSuccess && ipfsData?.toString()}
      <Image src={'https://minter.mypinata.cloud/ipfs/QmZZFHhdVBsocHvnefRnhVpLEkhnsrJZsuJbb2NUpCG2Sj'} alt='123' width={100} height={100} />
      {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
    </div>
  );
};