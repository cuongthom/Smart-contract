import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";
function App() {
  const ABI = [
    {
      inputs: [{ internalType: "string", name: "_greeting", type: "string" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "greet",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_greeting", type: "string" }],
      name: "setGreeting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const [account, setAccount] = useState(null);
  const [text, setText] = useState(null);

  
  async function requestAccount() {
    const isWeb3Browser = !!window.ethereum;
    const provider = isWeb3Browser
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
    console.log(provider);

    console.log("requesting");
    if (window.ethereum) {
      console.log("detected");
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account);
      } catch (error) {
        console.log("error connecting...");
      }
    } else {
      alert("meta mask not detected");
    }
  }









  const handleGetGreet = async (e) => {
    const isWeb3Browser = !!window.ethereum;
    const provider = isWeb3Browser
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
    const Contract = new ethers.Contract(
      "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
      ABI,
      provider
    );
    const greet = await Contract.greet();
    setText(greet);
  };



  const handleSetGreeting = async (e) => {
    
    if (!typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const isWeb3Browser = !!window.ethereum;
      const provider = isWeb3Browser
        ? new ethers.providers.Web3Provider(window.ethereum)
        : null;
        const signer = provider.getSigner()
        console.log(signer);
      const contract = new ethers.Contract("0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8", ABI, signer)
      const greeting = await contract.setGreeting(e)
      await greeting.wait()
    }
    console.log("cuong");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSetGreeting(e.target.getInput.value)
    setText(e.target.getInput.value)
    console.log("cuongthom");
  }

  
  return (
    <div className="App">
      <button onClick={requestAccount}>connect Meta Mask</button>
      <p>{account}</p>
      <hr/>
      {account ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input name="getInput" type="text"></input>
            <button>submit</button>
          </form>
          <button onClick={handleGetGreet}>greet</button>
          <h1>{text}</h1>
        </div>
      ) : null}
    </div>
  );
}

export default App;
