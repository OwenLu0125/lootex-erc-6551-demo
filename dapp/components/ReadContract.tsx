import { useState } from 'react';
import type { Address } from 'wagmi';
import { BaseError } from 'viem';
import { useContractRead } from 'wagmi';
import Erc721 from '../Contact/Erc721-demo.json'

export function ReadContract() {
  return (
    <div>
      <TokenURI />
    </div>
  );
}

const TokenURI = () => {
  const [address, setAddress] = useState<Address>('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'); // TODO: change to user address
  const { data, error, isLoading, isSuccess } = useContractRead({
    address: "0xd060E336282bBF24D507f16EC9961EE677cc5915",  // TODO: change to user address
    abi: Erc721.abi,
    functionName: 'tokenURI',
    args: [address],
    enabled: Boolean(address),
  });

  const [value, setValue] = useState<string>(address);

  return (
    <div>
      Token balance: {isSuccess && data?.toString()}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="tokenId"
        style={{ marginLeft: 4 }}
        value={value}
      />
      <button onClick={() => setAddress(value as Address)}>{isLoading ? 'fetching...' : 'fetch'}</button>
      {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
    </div>
  );
};