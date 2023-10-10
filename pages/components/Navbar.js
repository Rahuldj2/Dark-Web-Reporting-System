// Navbar.js
import React,{ useState } from 'react';
import styles from '/styles/Navbar.module.css';

const Navbar = () => {
    const [scrolling,setScrolling] = useState(false);
    const [activeTab,setActiveTab] = useState('Home');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    // Add scroll event listener when component mounts
    React.useEffect(() => {
        window.addEventListener('scroll',handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll',handleScroll);
        };
    },[]);

    return (
        <nav className={`${styles.nav} ${scrolling ? styles.affix : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="#">Your Logo</a>
                </div>
                <div id="mainListDiv" className={styles.mainList}>
                    <ul className={styles.navlinks}>
                        <li
                            className={activeTab === 'Home' ? styles.active : ''}
                            onClick={() => handleTabClick('Home')}
                        >
                            <a href="#">Home</a>
                        </li>
                        <li
                            className={activeTab === 'Tips' ? styles.active : ''}
                            onClick={() => handleTabClick('Tips')}
                        >
                            <a href="#">Tips</a>
                        </li>
                        <li
                            className={activeTab === 'Reviewing' ? styles.active : ''}
                            onClick={() => handleTabClick('Reviewing')}
                        >
                            <a href="#">Reviewing</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
