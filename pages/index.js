// pages/index.js

import Layout from './components/Layout';
import Head from 'next/head';
import HomeSlider from './components/HomeSlider';

// const inter = Inter({ subsets: ['latin'] })
const imageArray = ['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg','image6.jpeg'];

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>ASURDWEB</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

      </Layout>
      <div style={{ height: '20px' }}></div>
      <HomeSlider imageArray={imageArray} />
    </div>
  );
}
