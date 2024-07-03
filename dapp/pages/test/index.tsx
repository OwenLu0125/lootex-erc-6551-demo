import { SetStateAction, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box, colors } from '@mui/material';
import { WriteContract } from '../../components/WriteContract';
import { ReadContract } from '../../components/ReadContract';
import { CreateErc6551Account } from '../../components/CreateErc6551Account';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [nftContractAddressInput, setNftContractAddressInput] = useState<string>('');
  const [tokenIdInput, setTokenIdInput] = useState<number>(Number);

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
              <CreateErc6551Account />
              {/* <WriteContract /> */}
              {/* <ReadContract /> */}
            </Container>
          </Paper>
        </Box>
      ) : null
      }
    </main >
  )
}

export default Home;
