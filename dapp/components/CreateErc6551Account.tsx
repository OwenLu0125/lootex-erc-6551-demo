import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Typography } from '@mui/material';
import Erc6551 from '../Contact/Erc6551-createAccount.json'

export function CreateErc6551Account() {
  const [tokenId, setTokenId] = useState<string>('');
  const [tokenContract, setTokenContract] = useState<string>('');

  const { write: createFunction, data, error, isLoading, isError } = useContractWrite({
    address: "0xeecb21509025987A6F68db167d2194840612337F",
    abi: Erc6551.abi,
    functionName: 'createAccount',
    args: [
      '0x8fE0093FC05c7cF697400BEBF7f9918C49BD5BFc',
      '0x4c6f6f7465780000000000000000000000000000000000000000000000000000',
      5000,
      tokenContract,
      tokenId
    ],
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    console.log(data);
    console.log(error?.message);
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
        create erc6551 account:
      </Typography>
      <div>
        <input onChange={(e) => setTokenContract(e.target.value)} placeholder="nft contract address" value={tokenContract} />
        <br />
        <input onChange={(e) => setTokenId(e.target.value)} placeholder="token id" value={tokenId} />

        <button disabled={isLoading} onClick={() => createFunction()}>
          create
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {/* TODO: create 出來的tba 資料沒有抓出來 */}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}