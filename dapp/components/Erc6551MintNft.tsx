import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import Erc6551 from '../Contact/Erc6551-createAccount.json'
import ERC6551Account from '../Contact/ERC6551Account.json'
import { Typography } from '@mui/material';
import { ethers } from 'ethers';

export function Erc6551MintNft() {
  const [tokenId, setTokenId] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);


  const { write: mintFunction, data, error, isLoading, isError } = useContractWrite({
    address: "0x8fE0093FC05c7cF697400BEBF7f9918C49BD5BFc",
    abi: ERC6551Account.abi,
    functionName: 'execute',
    args: [
      '0x8A45161bFB9c36748CCA23E251143d02cd7b540d',
      0,
      ethers.utils.toUtf8Bytes('mint'),
      0,
    ]
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    try {
      console.log(data);
      console.log(error);
      console.log(isLoading);
      console.log(isError);
      console.log(receipt); // receipt is the transaction receipt
      console.log(isPending);
      console.log(isSuccess);
    } catch (error) {
      console.error(error);
    }
  }, [data, error, isError, isLoading, isPending, isSuccess, receipt])

  const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const account_abi = '<abi>';
    const nft_abi = '<abi>';
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider); //FIXME:need env variable
    const contract = new ethers.Contract("<event account address>", account_abi, signer);
    const iface = new ethers.utils.Interface(nft_abi);
    //const token = await contract.token();
    const owner = await contract.owner();
    console.log(owner);

    const functionName = "mint";
    const params = [1];
    const data = iface.encodeFunctionData(functionName, params);

    const req = await contract.execute("<nft address>", 0, data, 0);
    const res = await req.wait();
    console.log(res);
  }

  return (
    <div>
      <Typography
        sx={{
          color: 'white'
        }}>
        use erc6551 mint nft:
      </Typography>
      <div>
        <button disabled={isLoading} onClick={() => mintFunction()}>
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {receipt && <div>{receipt.transactionHash}</div>}
      {isError && error && <div>{error.toString()}</div>}
    </div>
  );
}