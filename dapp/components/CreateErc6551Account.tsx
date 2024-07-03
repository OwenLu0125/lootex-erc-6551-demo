import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Button, TextField, Typography } from '@mui/material';
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
        variant='h5'
        sx={{
          color: 'white'
        }}>
        create erc6551 account:
      </Typography>
      <div>
        <TextField fullWidth label="type nft contract address" id="addInput"
          InputLabelProps={{ style: { color: 'white' } }}
          color='secondary'
          sx={{
            mb: '15px',
            mt: '15px',
          }}
          inputProps={{
            style: { color: 'white' },
          }}
          value={tokenContract}
          onChange={(e) => setTokenContract(e.target.value)}
        />
        <TextField fullWidth label="token id" id="addInput"
          InputLabelProps={{ style: { color: 'white' } }}
          color='secondary'
          sx={{
            mb: '15px',
            mt: '15px',
          }}
          inputProps={{
            style: { color: 'white' },
          }}
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <Button fullWidth variant="contained" disabled={isLoading} onClick={() => createFunction()}>
          create
        </Button>

      </div>
      {isPending && <div>Pending...</div>}
      {/* TODO: 確認下一行是否可以正確顯示 tba 資料 */}
      {isSuccess && <div>Success: {receipt && receipt.toString()}</div>}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}