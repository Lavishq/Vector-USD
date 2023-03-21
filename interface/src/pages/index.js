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
            SSC
          </div>


          <div className='text-4xl my-4'>
            Make Your Coin Super Stable
          </div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

          <div className='mt-4 justify-between space-x-4'>
            <button onClick={() => router.push('/app')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Launch App</button>
            <button onClick={() => router.push('#')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go to Doc</button>

          </div>
        </div>


        <div className='my-36 mx-24' >
          <Image src={"/coin.png"} width={"2200"} height={"800"} alt={""} />
        </div>

      </main>
    </Layout>


  )
}
