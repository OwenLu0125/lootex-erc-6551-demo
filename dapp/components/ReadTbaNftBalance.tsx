import { useEffect, useState } from 'react';
import { BaseError } from 'viem';
import { useContractRead } from 'wagmi';
import Erc721 from '../Contact/Erc721-demo.json'
import { Box, Button, Card, CardMedia, TextField, Typography } from '@mui/material';

export function ReadTbaNftBalance() {
  return (
    <>
      <TokenURI />
    </>
  );
}

const TokenURI = () => {
  const [ERC6551AccountWallet, setERC6551AccountWallet] = useState<string>('');
  const [wagmiAccount, setWagmiAccount] = useState<string>('');
  const [nftBalance, setBalance] = useState<number | undefined>(undefined);

  const { data: balance, error, isLoading, isSuccess } = useContractRead({
    address: "0x8A45161bFB9c36748CCA23E251143d02cd7b540d",
    abi: Erc721.abi,
    functionName: 'balanceOf',
    args: [wagmiAccount],
    onSuccess: (data: number) => {
      setBalance(data);
    }
  });

  useEffect(() => {
    console.log(error);
    console.log(balance);
    setBalance(balance);
    console.log(nftBalance)
  }, [error, balance, nftBalance]);

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
          balance of nft :
        </Typography>
        <TextField fullWidth label="Tba address" id="addInput"
          InputLabelProps={{ style: { color: 'white' } }}
          color='secondary'
          sx={{
            mb: '15px',
            mt: '15px',
          }}
          inputProps={{
            style: { color: 'white' },
          }}
          value={ERC6551AccountWallet}
          onChange={(e) => setERC6551AccountWallet(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={() => setWagmiAccount(ERC6551AccountWallet)}>{isLoading ? 'fetching...' : 'fetch'}
        </Button>
        {/* {isSuccess &&
          <div>
            <Typography
              sx={{
                color: 'white',
              }}
            >
              {balance?.toString()}

            </Typography>
          </div>
        } */}
        {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
      </Box>
      {balance && Array.from({ length: Number(balance) }).map((_, index) => (
        <Card key={index}>
          <CardMedia
            component="img"
            alt="green iguana"
            height={100}
            width={100}
            image="https://lootex.imgix.net/https%3A%2F%2Flootex.mypinata.cloud%2Fipfs%2FQmVHhoeo3Y5BDQkLggtbPkDi3SqRbdLBZ6ibu9WhhVEBPA?q=75&auto=format&fit=max&w=1080&s=1cbd66cc067be6b49fbb33cb36e032d5"
          />
        </Card>
      ))}
    </>
  );
};