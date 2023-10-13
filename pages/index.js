// pages/index.js

import Layout from './components/Layout';
import Head from 'next/head';
import HomeSlider from './components/HomeSlider';

// const inter = Inter({ subsets: ['latin'] })
const imageArray = ['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg','image6.jpeg'];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ASURDWEB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ height: '70px' }}></div>
      
      {/* <h1>ASURDWEB</h1>
      <p>
        Team:
        Three Pointers
      </p> */}
      <HomeSlider imageArray={imageArray} />
    </Layout>
  )
}
