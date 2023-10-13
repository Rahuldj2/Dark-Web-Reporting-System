// ReportTip.js
import React,{ useState } from 'react';
import styles from '../../styles/ReportTip.module.css';
import { ethers } from 'ethers';
import { contractABI,contract_address } from '../../Contracts/ContractDetails.js';
import Web3 from "web3";

// import { firebase } from './firebase.js';

import{app} from './config.js';
import {getFirestore,collection,addDoc,setDoc,doc,getDoc} from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBrb9MnM6Gp5rrI-1xDrjWJMqJ0RNlvu3M",
//     authDomain: "asur-dcb94.firebaseapp.com",
//     projectId: "asur-dcb94",
//     storageBucket: "asur-dcb94.appspot.com",
//     messagingSenderId: "223262599301",
//     appId: "1:223262599301:web:a759110fc75e57864aa1ec",
//     measurementId: "G-CNTD2ECYTG"
//   };

//   const app = initializeApp(firebaseConfig);
// // Initialize Firebase


const db = getFirestore(app);
const ReportTip = () => {
    const [url,setUrl] = useState('');
    const [description,setDescription] = useState('');
    const [walletId,setWalletId] = useState('');
    const [confirm,setConfirm] = useState(false);

    const metaSubmit = async () => {
        if (typeof window.ethereum !== 'undefined') {
            // Requesting MetaMask to enable accounts
            await window.ethereum.enable();

            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            const userAccount = accounts[0];

            // Creating an instance of the contract
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI,contract_address);

            console.log('MetaMask connected');
            return { web3,contract,userAccount };
        } else {
            console.log('MetaMask not found');
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            // Connect to Metamask
            const { web3,contract, userAccount } = await metaSubmit();
    
            if(contract){

                const txValue = ethers.parseEther('0.1');
                
                const tx = await contract.methods.submitTip().send({
                    from: userAccount,
                    value: txValue,
                    gas: web3.utils.toHex(3000000)
                });
            // Create a reference to the "users" collection
            const usersCollectionRef = collection(db, "users");
    
            const userAccountStr = userAccount.toString(); // Convert wallet ID to string
    
            // Create a reference to the user's document based on the wallet ID
            const userDocRef = doc(usersCollectionRef, userAccountStr);
    
            // Get the existing user data from Firestore
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data() || {}; // Initialize as an empty object if data doesn't exist
    
            // Create a new tip object
            const newTip = {
                url: url,
                description: description,
                walletId: walletId,
                solved: false,
            };
    
            // Initialize 'tips' as an empty array if it doesn't exist
            userData.tips = userData.tips || [];
            
            // Add the new tip to the existing tips array in user data
            userData.tips.push(newTip);
    
            // Update the user's document with the updated tips array
            await setDoc(userDocRef, userData);
    
            console.log('Tip data stored in Firestore subcollection "tips".');
            console.log('Form submitted!');
        }else{

    console.error('Error:', error);     }
        } catch (error) {
            console.error('Error:', error);
        }
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
                Wallet ID:
                <input type="text" value={walletId} onChange={(e) => setWalletId(e.target.value)} className={styles.formInput} />
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