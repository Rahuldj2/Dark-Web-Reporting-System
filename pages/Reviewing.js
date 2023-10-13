// pages/Reviewing.js
import Layout from './components/Layout.js';
import Head from 'next/head';
import ReviewTip from './components/ReviewTip.js';

const Reviewing = () => {
    return (
        <Layout>
            <Head>
                <title>ASURDWEB - Reviewing</title>
                {/* Add any specific meta tags for the Reviewing page */}
            </Head>
            <div style={{ height: '100px' }}></div>
            <ReviewTip />
            {/* Add other content related to the Reviewing page */}
        </Layout>
    );
};

export default Reviewing;
