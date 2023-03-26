import Layout from '@/components/Layout'
import { Card } from 'antd'
import { vector } from "../../contracts/abi/vector";
import { ercabi } from "../../contracts/abi/erc.js";
import { DAI_ADDRESS, SSC_ADDRESS } from '@/contracts/address';
import { erc20ABI } from 'wagmi';
import { getAccount } from '@wagmi/core'
import { useEffect, useState } from 'react';
import { useContract, useSigner } from "wagmi";
import { useAccount } from 'wagmi'
import { ethers } from 'ethers/lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BigNumber } from 'ethers';
export default function CoinApp() {
  const account = getAccount();
  const [balance, setBalance] = useState(0);
  const [Buyamount, setBuyamount] = useState(0);
  const [basket, setBasket] = useState([]);
  const [Burnamount, setBurnamount] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data: signer, signerOrProvider, isError, isLoading } = useSigner()

  useEffect(() => {
    getSSCToken()
  }, [address])
  const sscContract = useContract({
    address: SSC_ADDRESS,
    abi: vector,
    signerOrProvider: signer
  })
  const getSSCToken = async () => {
    try {
      if (window.ethereum) {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        let contract = new ethers.Contract(SSC_ADDRESS, vector, provider)
        const sscBalance = await contract.balanceOf(address)
        setBalance(ethers.utils.formatEther(sscBalance))
        console.log(balance)
        const sscTokens = await contract.getBasketTokens()
        setBasket(sscTokens)
        console.log(sscTokens)
      }
    } catch (e) {
      console.log(e)
    }

  }

  const minttokens = async () => {
    if (address) {
      for (let index = 0; index < basket.length; index++) {
        let contract = new ethers.Contract(basket[index]?.backedStableToken, ercabi, signer)
        let amount = BigInt(100 * 10 ** (basket[index]?.decimal).toString())
        let amount1 = await contract.mint(address, amount)
        console.log(amount1)
      }
    }
  }

  const BuyToken = async () => {
    if (address) {
      for (let index = 0; index < basket.length; index++) {
        let contract = new ethers.Contract(basket[index]?.backedStableToken, erc20ABI, signer)
        let allowance = await contract.allowance(address, SSC_ADDRESS)
        let amount = BigInt(10 ** (basket[index]?.decimal).toString())
        let amount1 = BigInt(Buyamount)
        let amount2 = amount1 * amount
        console.log(amount2)

        if (BigInt((allowance)) < amount2) {
          try {
            toast.info('Aprrove the Token', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            let done = await contract.approve(SSC_ADDRESS, (Buyamount));
            done.wait().then((receipt) => {
              if (done) {
                toast.success('Token Approved', {
                  position: "top-left",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              } else {
                toast.error('Token Approval Failled', {
                  position: "top-left",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            })

            console.log("approving")
          } catch (e) {
            toast.error('Token Approval Failled', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(e)
            return;

          }
        }
      }
      console.log("buying");
      console.log(Buyamount / basket.length);
      // let a=Math.floor(Buyamount / basket.length)
      toast.info('Minting Tokens', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      try {
        let done = await sscContract?.addCollateralToGetTokens(address, (Buyamount / basket.length))
        done.wait().then((receipt) => {
          if (receipt) {
            toast.success('Tokens Minted', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.error('Tokens Not Minted', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
      } catch (e) {
        toast.error('Tokens Mint Failled', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      }
    }

  }
  const BurnToken = async () => {
    if (address) {

      let allowance = await sscContract?.allowance(address, SSC_ADDRESS);
      console.log(BigInt(allowance))
      if (BigInt(allowance) < BigInt(Burnamount)) {
        await sscContract?.approve(SSC_ADDRESS, Burnamount)
        console.log("approving")
      }
      await sscContract?.removeCollateral(Burnamount, { gasLimit: 1000000 })

    }
  }



  return (
    <>
      <Layout>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <main className='flex justify-center'>

          <Card
            hoverable
            style={{ width: 1300, height: 600 }} className={'bg-cyan-700 text-white mt-5'} >

            <div>
              <div className='font-mono font-extrabold text-2xl text-center'>
                <h1>Your Balance:{balance} VUSD</h1>

              </div>
              {/* <div className='mt-5 font-mono font-bold text-lg text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div> */}
            </div>



            <div className='mt-16 '>
              <div className="mb-6 flex justify-center space-x-10">
                <input onChange={(e) => { setBuyamount(e.target.value) }} type="text" id="large-input" placeholder='0.00' class="block text-lg w-72 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button onClick={BuyToken} type="button" class="text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mint VUSD</button>
              </div>
              <div className="mb-6 flex justify-center space-x-10">
                <input onChange={(e) => { setBurnamount(e.target.value) }} type="text" id="large-input" placeholder='0.00' class="block text-lg w-72 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button onClick={BurnToken} type="button" class="text-white text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Burn VUSD</button>
              </div>
            </div>
            <div onClick={minttokens}>Mint Tokens </div>
            <h1>Currently the smart contract is deployed in the Mumbai Testnet</h1>
            {/* <h1>Contract Address</h1>
            <h1> USDC Address </h1>
            <h1>DAI Address</h1> */}
            {/* <h1 >Currently the basket is only filled with DAI and USDC </h1>
            <h1>The project is Currently on the mumbai testnet </h1> */}





          </Card>
        </main>
      </Layout>
    </>
  )
}
