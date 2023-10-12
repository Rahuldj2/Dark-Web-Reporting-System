// ReviewTip.js
import React,{ useState,useEffect } from 'react';
import styles from '../../styles/ReviewTip.module.css';

const formatDate = (date) => {
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
};

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

    useEffect(() => {
        const sortedTips = [...tips].sort((a,b) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
        setTips(sortedTips);
    },[sortBy,sortOrder]);

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

    return (
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
                        <tr key={tip.id}>
                            <td className={styles.tableCell}>{tip.id}</td>
                            <td className={styles.tableCell}>{tip.url.slice(0,30)}...</td>
                            {/* Use suppressHydrationWarning for the timestamp */}
                            <td className={styles.tableCell} suppressHydrationWarning>
                                {formatDate(tip.datetime)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewTip;
