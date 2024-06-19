import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [number, setNumber] = useState(null);        ///////change 1
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const Bank_transfer = async() =>{
    if(atm){
      let tx= await atm.Bank_transfer(1,"0x6aDED69b19108E028F502Ac836489F0BDC6F4bBF");   /////change 2
      await tx.wait();
      getBalance();
      
    }
  };
 

  const generateNumber = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setNumber(randomNum);                                        ////change 3
    setGuess(null);
    setResult(null);
  };

  const handleGuess = (userGuess) => {
    setGuess(userGuess);
    const isEven = number % 2 === 0;
    const userGuessedCorrectly = (isEven && userGuess === "even") || (!isEven && userGuess === "odd");
    setResult(userGuessedCorrectly ? "You guessed correctly!" : "Sorry, you guessed wrong.");

    if (userGuessedCorrectly) {
      deposit();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance == undefined) {
      getBalance();
    }


    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={Bank_transfer}>Donate 1ETH</button>            

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Basic Casino Game</h2>
          <button onClick={generateNumber} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Generate Number
          </button>
          {number !== null && (
            <>
              <div style={{ marginTop: "20px" }}>
                <button onClick={() => handleGuess("even")} style={{ padding: "10px 20px", marginRight: "10px", fontSize: "16px" }}>
                  Even
                </button>
                <button onClick={() => handleGuess("odd")} style={{ padding: "10px 20px", fontSize: "16px" }}>
                  Odd
                </button>
              </div>
              {guess && (
                <div style={{ marginTop: "20px", fontSize: "18px" }}>
                  <p>The number was: {number}</p>
                  <p>{result}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}
