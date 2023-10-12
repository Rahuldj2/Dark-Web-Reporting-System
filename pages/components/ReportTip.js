// ReportTip.js
import React,{ useState } from 'react';
import styles from '../../styles/ReportTip.module.css';
import { ethers } from 'ethers';
import { contractABI,contract_address } from '../../Contracts/ContractDetails.js';
import Web3 from "web3";

// import { firebase } from './firebase.js';

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
            return { contract,userAccount };
        } else {
            console.log('MetaMask not found');
            return null;
        }
    };

    // const handleSubmit = async () => {
    //     try {
    //         // Connect to Metamask
    //         const { contract,userAccount } = await metaSubmit();

    //         console.log('Contract instance:',contract);
    //         const todoref = firebase.firestore().collection("tips");
    //         // Example: Send a transaction to a contract method
    //         // Assuming you have a method named submitTip in your contract ABI
    //         // const tx = await contract.methods.submitTip().send({
    //         //   from: userAccount,
    //         //   value: ethers.parseEther('0.00000000001'),
    //         // });

    //         // Store form information in Firestore
    //         console.log(url,description,walletId,userAccount);
    //         try {
    //             const saveToFirebase = firestore;
    //             console.log("here");

    //             const result = saveToFirebase?.collection("tips")?.set({
    //                 url: url,
    //                 description: description,
    //                 walletId: walletId,
    //                 userAccount: userAccount,
    //             }).then(() => console.log('success').catch((error) => {
    //                 error.message && alert(error.message);
    //                 console.log(
    //                     'Something went wrong while adding user data to firestore: ',
    //                     error,
    //                 );
    //                 return 'error';
    //             }));

    //             console.log('Firestore Add Result:',result);
    //         } catch (error) {
    //             console.error('Firestore Add Error:',error);
    //         }

    //         console.log('Form submitted and data stored in Firestore!');
    //     } catch (error) {
    //         console.error('Error:',error);
    //     }
    // };

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
