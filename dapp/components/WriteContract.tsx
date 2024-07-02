import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import Erc721 from '../Contact/Erc721-demo.json'
import { stringify } from 'viem';

export function WriteContract() {
  const [tokenId, setTokenId] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);


  const { write, data, error, isLoading, isError } = useContractWrite({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",
    abi: Erc721.abi,
    functionName: 'mint',
    args: [amount]
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      <div>Mint a wagmi:</div>
      <div>
        <input onChange={(e) => setTokenId(e.target.value)} placeholder="token id" value={tokenId} />
        <button disabled={isLoading} onClick={() => write({ args: [BigInt(tokenId)] })}>
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}