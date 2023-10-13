// pages/index.js

import Layout from './components/Layout';
import Head from 'next/head';
import ReportTip from './components/ReportTip';
import ReviewTip from './components/ReviewTip';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ASURDWEB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ height: '100px' }}></div>
      
      <h1>ASURDWEB</h1>
      <p>
        Team:
        Three Pointers
      </p>
    </Layout>
  )
}
