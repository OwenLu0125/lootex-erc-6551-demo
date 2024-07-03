import { useState } from 'react';
import type { Address } from 'wagmi';
import { BaseError } from 'viem';
import { useContractRead } from 'wagmi';
import Erc721 from '../Contact/Erc721-demo.json'
import { Typography } from '@mui/material';

export function ReadContract() {
  return (
    <div>
      <TokenURI />
    </div>
  );
}

const TokenURI = () => {
  const [tokenId, setTokenId] = useState<number | undefined>(undefined);
  const [value, setValue] = useState<number | undefined>(tokenId); const { data, error, isLoading, isSuccess } = useContractRead({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",
    abi: Erc721.abi,
    functionName: 'tokenURI',
    args: [tokenId],
    enabled: Boolean(tokenId),
  });


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
      {isSuccess && data?.toString()}
      {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
    </div>
  );
};