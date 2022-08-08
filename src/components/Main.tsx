import React, { useState, useEffect } from 'react';
import { Artifact, Network } from 'cashscript';
import { compileString } from 'cashc';
import { RowFlex, Wallet } from './shared';
import Editor from './Editor';
import ContractInfo from './ContractInfo';
import WalletInfo from './Wallets';

interface Props { }

const Main: React.FC<Props> = () => {
  const [code, setCode] = useState<string>(
    `pragma cashscript ^0.6.5;

    contract P2PKH(bytes20 pkh) {
        // Require pk to match stored pkh and signature to match
        function spend(pubkey pk, sig s) {
            require(hash160(pk) == pkh);
            require(checkSig(s, pk));
        }
    }
`);

  const [artifact, setArtifact] = useState<Artifact | undefined>(undefined);
  const [network, setNetwork] = useState<Network>('mainnet')
  const [showWallets, setShowWallets] = useState<boolean | undefined>(false);
  const [wallets, setWallets] = useState<Wallet[]>([])

  useEffect(() => {
    compile();
  }, [])

  function compile() {
    try {
      const artifact = compileString(code);
      setArtifact(artifact);
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    }
  }

  return (
    <RowFlex style={{
      padding: '32px',
      paddingTop: '0px',
      height: 'calc(100vh - 120px'
    }}>
      <Editor code={code} setCode={setCode} compile={compile} />
      <WalletInfo style={!showWallets ? { display: 'none' } : {}} network={network} setShowWallets={setShowWallets} wallets={wallets} setWallets={setWallets} />
      <ContractInfo style={showWallets ? { display: 'none' } : {}} artifact={artifact} network={network} setNetwork={setNetwork} setShowWallets={setShowWallets} wallets={wallets} />
    </RowFlex>
  )
}

export default Main;
