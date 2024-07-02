import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import Erc721 from '../Contact/Erc721-demo.json'
import { Typography } from '@mui/material';

export function ReadContract() {
  const [tokenId, setTokenId] = useState<string>('');

  const { write: tokenURIFunction, data, error, isLoading, isError } = useContractWrite({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",
    abi: Erc721.abi,
    functionName: 'tokenURI',
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    console.log(data);
    console.log(error);
    console.log(isLoading);
    console.log(isError);
    console.log(receipt); // receipt is the transaction receipt
    console.log(isPending);
    console.log(isSuccess);
  }, [data, error, isError, isLoading, isPending, isSuccess, receipt])

  return (
    <div>
      <Typography
        sx={{
          color: 'white'
        }}>
        tokenURI:
      </Typography>
      <div>
        <input onChange={(e) => setTokenId(e.target.value)} placeholder="token id" value={tokenId} />
        <button disabled={isLoading} onClick={() => tokenURIFunction({ args: [BigInt(tokenId)] })}
        >
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}