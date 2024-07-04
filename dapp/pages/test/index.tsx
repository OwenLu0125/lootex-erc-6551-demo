import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box, colors } from '@mui/material';
import { WriteContract } from '../../components/WriteContract';
import { ReadContract } from '../../components/ReadContract';
import { CreateErc6551Account } from '../../components/CreateErc6551Account';
import { Erc6551MintNft } from '../../components/Erc6551MintNft';
import { ReadTbaNftBalance } from '../../components/ReadTbaNftBalance';

const Home: NextPage = () => {

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
      <div style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#18131A',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: '999' }}>
          <Paper
            sx={{
              width: '45%',
              padding: '2rem',
              maxHeight: '80vh',
              background: '#18131A',
              border: '2px solid #3E393E',
              borderRadius: '1rem',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}>

            <Container sx={{ py: 2 }} maxWidth="md">
              <Grid container direction={'column'} justifyContent="center" alignItems="center"
                gap={2}
              >
                <ConnectButton />
                <CreateErc6551Account />
                <Erc6551MintNft />
                <ReadTbaNftBalance/>
              </Grid>
              {/* <WriteContract /> */}
              {/* <ReadContract /> */}
            </Container>
          </Paper>
        </Box>
      </div>
    </main >
  )
}

export default Home;
