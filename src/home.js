import React, { useState } from 'react'
import {ethers} from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreetingValue] = useState("")

  async function dangnhap() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        setGreetingValue(data)
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }
  
  async function setGreeting(value) {
    if (!value) return;
    if (!typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      dangnhap()
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await setGreeting(event.target.greetingInput.value)
    setGreetingValue(event.target.greetingInput.value)
    event.target.greetingInput.value = ""
  }

  return (
    <div className="w-full max-w-lg container">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="text-gray-600 font-bold text-lg mb-2">
            React Ethereum Dapp
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
          <div className="text-gray-600 font-bold text-md mb-2">
            Fetch Greeting Message From Smart Contract
          </div>
          <div className="flex ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={dangnhap}>Fetch Greeting</button>
          </div>
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
          <div className="text-gray-600 font-bold text-md mb-2">
            Set Greeting Message On Smart Contract
          </div>
          <form 
            className="flex items-center justify-between"
            onSubmit={event=>handleSubmit(event)}
            >
            <input 
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              name="greetingInput"
            />
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set Greeting</button>
          </form>
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400 bg-gray-100">
          <div className="text-gray-600 font-bold text-md mb-2">
            Greeting Message 
          </div>
          <p>
            {greeting}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;