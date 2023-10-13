// pages/index.js

import Layout from './components/Layout';
import Head from 'next/head';
import HomeSlider from './components/HomeSlider';
import styles from '../styles/Index.module.css'; // Import a new CSS file for this page
import Flowchart from './components/Flowchart';
import Image from 'next/image';

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

      <div className={styles.aboutSection}>
        <h2>About ASUR DarkWeb</h2>
        <p>
          At ASUR, we're taking a significant step toward enhancing security and vigilance on the dark web. In a world where online shadows can hide illicit activities, our platform stands as a dedicated effort to bring a new level of safety and monitoring. We empower users to report any concerns anonymously, ensuring a secure space for everyone. Our tool provides government cybercrime officers with a powerful resource to conduct thorough investigations. ASUR DarkWeb is not just a platform; it's a commitment to fortifying the online world. Join us in this journey towards a more secure and monitored digital landscape.
        </p>
      </div>

      <div className={styles.flowchartSection}>
        <h2>Process Flowchart</h2>
        <Flowchart />
      </div>

      <div className={styles.teamSection}>
        <h2>Meet The Team</h2>
        <div className={styles.teamDetails}>
          <Image src={'/team.jpg'} style={{marginRight:'100px',borderRadius:'20px'}}alt='' width={500} height={500} />
          <div className={styles.teamText}>
            <p>
              Team Name: Three Pointers
              <br />
              Rahul Jayaram
              <br />
              Aayush Arora
              <br />
              Punyam Singh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
