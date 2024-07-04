import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Box, Button, TextField, Typography } from '@mui/material';
import Erc6551 from '../Contact/Erc6551-createAccount.json'
import { decodeEventLog } from 'viem';
import { Receipt } from '@mui/icons-material';

export function CreateErc6551Account() {
  const [tokenId, setTokenId] = useState<string>('');
  const [tokenContract, setTokenContract] = useState<string>('');
  const [deCodeEvent, setDeCodeEvent] = useState<any>();

  const { write: createFunction, data, error, isLoading, isError, } = useContractWrite({
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
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (receipt) => {
      console.log(receipt);
      const deCodeEvent = decodeEventLog(
        {
          abi: Erc6551.abi,
          data: receipt?.logs[0].data,
          topics: receipt?.logs[0].topics,
        })
      console.log(deCodeEvent.args);
      setDeCodeEvent(deCodeEvent.args);
    }
  }
  );


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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
        }}
      >
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
        {isPending &&
          <div>
            <Typography
              sx={{
                color: 'white',
              }}
            >Pending...
            </Typography>
          </div>
        }
        {isSuccess &&
          <>
            <Typography
              sx={{
                color: 'white',
              }}
            >
              Success: {deCodeEvent?.account}
            </Typography>
          </>
        }
        {isError &&
          <>
            <Typography
              sx={{
                color: 'purple',
              }}
            >
              {error?.message}
            </Typography>
          </>
        }
      </Box>
    </>
  );
}