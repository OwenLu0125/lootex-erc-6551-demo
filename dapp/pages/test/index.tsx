import { SetStateAction, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box, colors } from '@mui/material';
import { useWalletClient } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'
import { type TBAccountParams } from "@tokenbound/sdk/dist/src";
import { WriteContract } from '../../components/WriteContract';

const DEFAULT_ACCOUNT: TBAccountParams = {
  tokenContract: "0x",
  tokenId: ""
}

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addressInput, setAddressInput] = useState<string>('');
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const tokenboundClient = new TokenboundClient({ signer: walletClient, chainId: 11155111 })

  return (
    <main className="...">
      <Head>
        <title>CyberAquarium</title>
        <meta
          content="developer by Kevin & Owen"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div onClick={() => setIsOpen(!isOpen)}>
      </div>
      {isOpen ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Paper
            elevation={6}
            sx={{
              width: '45%',
              padding: '2rem',
              maxHeight: '80vh',
              background: 'linear-gradient(180deg, rgba(34, 36, 80, 0.9) 0%, rgba(23, 24, 38, 0.9) 100%)',
              border: '3px solid #6DCDFF',
              borderRadius: '1rem',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}>

            <Container sx={{ py: 2 }} maxWidth="md">
              <Grid container justifyContent="center" alignItems="center">
                <ConnectButton />
              </Grid>
              <TextField fullWidth label="Type TBA address" id="addInput"
                InputLabelProps={{ style: { color: 'white' } }}
                color='secondary'
                sx={{
                  mb: '15px',
                  mt: '15px',
                }}
                value={addressInput}
                inputProps={{
                  style: { color: 'white' },
                }}
                onChange={(e: { target: { value: SetStateAction<string> } }) => {
                  if (e.target.value.toString().startsWith("0x")) {
                    setAddressInput(e.target.value);
                  }
                  setAddressInput(e.target.value);
                }}
              />
              <Box
                sx={{ mb: '10px' }}
              >
                <Typography
                  display={'inline'}
                  sx={{
                    color: 'white'
                  }}
                >
                  Example:
                </Typography>
                <Button onClick={() => {
                  setAddressInput('0x21D07Aa5495609e009766cE9ABA798e5C668e86a');
                }}>address 1</Button>
                <Button onClick={() => {
                  setAddressInput('0x51840Ea7B892145feaCB347Ab2ebaac9032A2140');
                }}>address 2</Button>
              </Box>
              <WriteContract />
            </Container>
          </Paper>
        </Box>
      ) : null
      }
    </main >
  )
}

export default Home;
