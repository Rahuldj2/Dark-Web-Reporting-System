import { contractABI, contract_address } from '../../Contracts/ContractDetails.js';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useState, useEffect } from 'react';
import ethers from 'ethers';
import styles from '../../styles/ReportTip.module.css';

import { getFirestore, doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { app } from './config.js'; // Import your Firebase app configuration

export default function FundlogicComp() {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [walletId, setWalletId] = useState('');
    const [confirm, setConfirm] = useState(false);

    const { id, isWeb3Enabled, account } = useMoralis();
    const chainId = 11155111;
    const [fee, setFee] = useState("0");
    const { runContractFunction: submitTip } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contract_address,
        functionName: "submitTip",
        params: {},
        msgValue: fee
    });


    const {runContractFunction: getTips}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contract_address,
        functionName:"getTips",
        params:{"user":account},
    })


    useEffect(() => {
        if (isWeb3Enabled) {
            setFee('100000000000000000');
        }
    });
    const handleClick = async () => {
        try {
            console.log("hi");
            console.log(account)
            await submitTip()
            const tipList = await getTips(account);
            console.log(tipList.length)
            console.log(tipList);

            const currentLength = await getTipsArrayLength(account);
            storeUserData(account, {
                description: description,
                index: currentLength,
                solved: null,
                tip_id: account+"-"+currentLength,
                url: url,
                walletId: account,
                status:false
            });
        } catch (error) {
            console.error("Error submitting tip:", error);
        }
    }

    // Function to get the length of the tips array in the user's document
const getTipsArrayLength = async (userAccount) => {
    try {
        const firestore = getFirestore(app);
        const userDocRef = doc(firestore, 'users', userAccount);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const tipsArray = userData.tips || [];
            return tipsArray.length;
        } else {
            return 0; // Return 0 if the document doesn't exist (no tips yet)
        }
    } catch (error) {
        console.error('Error getting tips array length:', error);
        return 0;
    }
}
    
    // Function to store user data with tips in Firestore
    const storeUserData = async (userAccount, newTip) => {
        try {
            const firestore = getFirestore(app);
            const userDocRef = doc(firestore, 'users', userAccount); // 'users' is the collection name

            // Fetch the existing user data document
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                // The document already exists, update the tips array by adding the new tip
                await updateDoc(userDocRef, {
                    tips: arrayUnion(newTip)
                });
            } else {
                // The document doesn't exist, create a new one with the new tip
                await setDoc(userDocRef, {
                    tips: [newTip]
                });
            }

            console.log(`User data for ${userAccount} updated successfully.`);
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };

    return (
        <div>
            <label className={styles.formLabel}>
                URL:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Wallet ID:
                <input type="text" value={walletId} onChange={(e) => setWalletId(e.target.value)} className={styles.formInput} />
            </label>

            <label className={styles.formLabel}>
                Are You Sure?
                <input type="checkbox" checked={confirm} onChange={() => setConfirm(!confirm)} />
            </label>

            <button className={confirm ? styles.submitButton : styles.submitButtonDisabled}
                disabled={!confirm} onClick={handleClick}>Submit tip</button>
        </div>
    )
}
