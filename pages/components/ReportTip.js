// ReportTip.js
import React,{ useState } from 'react';
import styles from '/styles/ReportTip.module.css';

const ReportTip = () => {
    const [url,setUrl] = useState('');
    const [description,setDescription] = useState('');
    const [walletId,setWalletId] = useState('');
    const [amount,setAmount] = useState('');
    const [confirm,setConfirm] = useState(false);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className={styles.reportTipContainer}>
            <label className={styles.formLabel}>
                URL:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Import Images:
                <input type="file" accept="image/*" />
            </label>

            <label className={styles.formLabel}>
                Wallet ID:
                <input type="text" value={walletId} onChange={(e) => setWalletId(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Amount to Deduct:
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Are You Sure?
                <input type="checkbox" checked={confirm} onChange={() => setConfirm(!confirm)} />
            </label>

            <button
                className={confirm ? styles.submitButton : styles.submitButtonDisabled}
                disabled={!confirm}
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default ReportTip;