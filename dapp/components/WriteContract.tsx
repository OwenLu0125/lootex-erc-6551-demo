import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import Erc6551 from '../Contact/ERC6551Account.json'
import { Typography } from '@mui/material';

export function WriteContract() {
  const [tokenId, setTokenId] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);


  const { write: mintFunction, data, error, isLoading, isError } = useContractWrite({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",
    abi: Erc6551.abi,
    functionName: 'mint',
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
        Mint a wagmi:
      </Typography>
      <div>
        <input onChange={(e) => setTokenId(e.target.value)} placeholder="token id" value={tokenId} />
        <br />
        <input onChange={(e) => setAmount(Number(e.target.value))} placeholder="amount" value={amount} />
        <button disabled={isLoading} onClick={() => mintFunction({ args: [BigInt(amount)] })}>
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}