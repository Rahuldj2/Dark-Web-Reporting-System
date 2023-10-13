import React,{ useState,useEffect } from 'react';
import styles from '../../styles/ReviewTip.module.css';
import Login from './Login';

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';
import { app } from './config.js';


const formatDate = (date) => {
    if (date instanceof Date) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        return date.toLocaleString(undefined,options);
    } else {
        return 'Invalid Date'; // Handle the case when 'date' is undefined or not a valid Date object
    }
};


const FloatingWindow = ({ tip,onClose }) => (
    <div className={styles.floatingWindow}>
        <h2>Tip Details</h2>
        <p><strong>Tip ID:</strong> {tip.id}</p>
        <p><strong>Date:</strong> {formatDate(tip.datetime)}</p>
        <p><strong>Time:</strong> {tip.datetime.toLocaleTimeString()}</p>
        <p><strong>Wallet ID:</strong> {tip.walletId || 'N/A'}</p>
        <p><strong>Amount of Stake:</strong> {tip.amount || 'N/A'}</p>
        <p><strong>URL:</strong> {tip.url}</p>
        <p><strong>Approval Status:</strong> {tip.approved ? 'Approved' : 'Pending'}</p>

        {/* View other tips button */}
        <button className={styles.button}>View Other Tips</button>

        {/* Approve button with loader */}
        <button className={`${styles.button} ${styles.loaderButton}`}>
            {tip.approved ? 'Approved' : 'Approve'}
            {tip.approving && <div className={styles.loader} />}
        </button>

        <button className={styles.closeButton} onClick={onClose}></button>
    </div>
);

const ReviewTip = () => {
    const AllTips = [
        {
            id: 'ABC123',
            url: 'https://abcd1234.com',
            datetime: new Date('2023-10-12T14:55:17.000Z'),
        },
        {
            id: 'XYZ456',
            url: 'https://efgh5678.com',
            datetime: new Date('2023-10-12T13:45:21.000Z'),
        },
        {
            id: 'PQR789',
            url: 'https://ijkl9012.com',
            datetime: new Date('2023-10-12T12:30:00.000Z'),
        },
        // Add more tips as needed
    ];

    const [tips,setTips] = useState(AllTips);
    const [searchTerm,setSearchTerm] = useState('');
    const [sortBy,setSortBy] = useState('datetime');
    const [sortOrder,setSortOrder] = useState('desc');
    const [selectedTip,setSelectedTip] = useState(null);
    const [isLoggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchTipsFromFirestore = async () => {
            const firestore = getFirestore(app);
            const usersCollectionRef = collection(firestore,'users'); // Replace with your actual collection name

            try {
                const querySnapshot = await getDocs(usersCollectionRef);
                const tipData = [];

                querySnapshot.forEach((doc) => {
                    const userAccount = doc.id;
                    const userData = doc.data();
                    if (userData.tips) {
                        // If the user has tips, add them to the tipData array
                        userData.tips.forEach((tip) => {
                            tipData.push({
                                ...tip,
                                userAccount, // Add the userAccount for reference
                            });
                        });
                    }
                });

                // Log the retrieved tips data to the console
                console.log('Retrieved tips from Firestore:',tipData);

                // setTips(tipData);
            } catch (error) {
                console.error('Error fetching tips from Firestore:',error);
            }
        };

        // Call the function to fetch tips when the component mounts
        fetchTipsFromFirestore();




        const sortedTips = [...tips].sort((a,b) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
        setTips(sortedTips);
    },[sortBy,sortOrder]);

    const handleLogin = () => {
        // TODO: Implement login logic (e.g., check credentials, send verification link, etc.).
        // For simplicity, let's assume a successful login.
        setLoggedIn(true);
    };

    const handleSort = (column) => {
        setSortBy(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearch = () => {
        const filteredTips = AllTips.filter(
            (tip) =>
                tip.id.toString().includes(searchTerm) ||
                tip.url.includes(searchTerm)
        );
        setTips(filteredTips);
    };

    const handleTipClick = (tip) => {
        setSelectedTip(tip);
    };

    const handleCloseFloatingWindow = () => {
        setSelectedTip(null);
    };

    return (
        <div className={styles.reviewTipContainer}>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                // Render ReviewTip content here
                <div className={styles.reviewTipContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            className={styles.inputText}
                            placeholder="Search by Tip ID or URL"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={styles.button} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <table className={styles.tipsTable}>
                        <thead>
                            <tr>
                                <th
                                    className={styles.tableHeader}
                                    onClick={() => handleSort('id')}
                                >
                                    Tip ID
                                </th>
                                <th
                                    className={styles.tableHeader}
                                    onClick={() => handleSort('url')}
                                >
                                    URL
                                </th>
                                <th
                                    className={styles.tableHeader}
                                    onClick={() => handleSort('datetime')}
                                >
                                    Datetime
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tips.map((tip) => (
                                <tr key={tip.id} onClick={() => handleTipClick(tip)}>
                                    <td className={styles.tableCell}>{tip.id}</td>
                                    <td className={styles.tableCell}>{tip.url.slice(0,30)}...</td>
                                    <td className={styles.tableCell} suppressHydrationWarning>
                                        {formatDate(tip.datetime)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedTip && (
                        <FloatingWindow tip={selectedTip} onClose={handleCloseFloatingWindow} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewTip;