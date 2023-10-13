// Layout.js

import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div style={{ padding: '0rem 2rem' }}>
                {children}
            </div>
        </>
    );
};

export default Layout;