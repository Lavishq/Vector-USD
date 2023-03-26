import Image from 'next/image'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  return (

    <Layout>

      <main className='flex '>

        <div className='text-white my-72 mx-40 ' >
          <div className='text-6xl'>
            Vector
          </div>


          <div className='text-4xl my-5'>
            VUSD is  Backed by other StableCoins such as USDC , USDT, DAI, BUSD, Frax and more.
          </div>
          <br />
          <u> Creation of  VUSD </u>
          <p>Deposite the collateral Tokens(USDC, USDT, DAI, BUSD, Frax) and Mint VUSD</p>
          <br />
          <u>Burning of VUSD</u>
          <p>Burn VUSD and get back the collateral Tokens(USDC, USDT, DAI, BUSD, Frax)</p>
          <br />
          <u> Why we Need VSDC</u>
          <p>Diversification: By backing the VUSD with multiple stablecoins, the risk is spread across various assets, reducing the potential for any one asset to cause a significant impact on the overall value of the stablecoin.</p>

          <div className='mt-4 justify-between space-x-4'>
            <button onClick={() => router.push('/app')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Launch App</button>
            {/* <button onClick={() => router.push('#')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go to Doc</button> */}

          </div>
        </div>


        <div className='my-36 mx-24' >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Image src={"/homescreen.png"} width={"2200"} height={"800"} alt={""} />
        </div>

      </main>
    </Layout>


  )
}
