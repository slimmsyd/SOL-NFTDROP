import React, { useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { useState } from 'react';
import CandyMachine from './CandyMachine';
// Constants
const TWITTER_HANDLE = 'slimmsyd';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  //Declaring State
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async() => { 
    try {
      const {solana} = window;

      if(solana) { 
        if(solana.isPhatom) { 
          console.log("Phatom Wallet Found!");
          const response = await solana.connect({onlyIfTrusted: true});
          console.log("Connected with Public Key:", response.publicKey.toString())
          setWalletAddress(response.publicKey.toString());

        };
      }else {
        alert("Solana Object Not Found!, Get A Phatom Wallet");
      }
    }catch(err) { 
      console.error(err)
    }
  };

  //Connect Wallet 

  const connectWallet = async() => { 
    const {solana} = window;

    if(solana) { 
      const response = await solana.connect();
      console.log("Connected With Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    };

  };
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => { 
    const onLoad = async () => { 
      await checkIfWalletIsConnected();
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);

  }, [])


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Meta Meta Drop</p>
          <p className="sub-text">NFT Drop to join the Meta Meta</p>
          {!walletAddress  && renderNotConnectedContainer()}
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
