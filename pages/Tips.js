// pages/Tips.js
import Layout from './components/Layout.js';
import Head from 'next/head';
import ReportTip from './components/ReportTip.js';

const Tips = () => {
    return (
        <Layout>
            <Head>
                <title>ASURDWEB - Tips</title>
                {/* Add any specific meta tags for the Tips page */}
            </Head>
            <div style={{ height: '100px' }}></div>
            {/* <h1>Tips Page</h1> */}
            <ReportTip />
            {/* Add other content related to the Tips page */}
        </Layout>
    );
};

export default Tips;
