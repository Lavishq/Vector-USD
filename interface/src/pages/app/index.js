
import Layout from '@/components/Layout'
import { Card } from 'antd'



export default function CoinApp() {
  return (
    <>
      <Layout>

        <main className='flex justify-center'>

          <Card
            hoverable
            style={{ width: 1300, height: 600 }} className={'bg-cyan-700 text-white mt-5'} >

            <div>
              <div className='font-mono font-extrabold text-2xl text-center'>Welcome to SSC</div>
              <div className='mt-5 font-mono font-bold text-lg text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </div>



            <div className='mt-16 '>
              <div className="mb-6 flex justify-center space-x-10">
                <input type="text" id="large-input" placeholder='0.00' class="block text-lg w-72 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button onClick={""} type="button" class="text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy SSC</button>
              </div>
              <div className="mb-6 flex justify-center space-x-10">
                <input type="text" id="large-input" placeholder='0.00' class="block text-lg w-72 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button onClick={""} type="button" class="text-white text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sell SSC</button>
              </div>
            </div>




          </Card>
        </main>
      </Layout>
    </>
  )
}
