// pages/index.js

import Layout from './components/Layout';
import Head from 'next/head';
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ASURDWEB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
    // <>
    //   <main className={`${styles.main} ${inter.className}`}>
    //     Hello this is the homepage for Dark web reporting system <br></br>
    //     /AnonTip route to edit Anonymous tip form<br></br>
    //     /GovtView endpoint govtview
    //   </main>
    // </>
  )
}
