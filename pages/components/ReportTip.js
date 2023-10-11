// ReportTip.js
import React,{ useState } from 'react';
import styles from '../../styles/ReportTip.module.css';
import { ethers } from 'ethers';
import { contractABI, contract_address } from '../../Contracts/ContractDetails.js'
import Web3 from "web3";


const ReportTip = () => {
    const [url,setUrl] = useState('');
    const [description,setDescription] = useState('');
    const [walletId,setWalletId] = useState('');
    // const [amount,setAmount] = useState('');
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
            const web3 = new Web3(window.ethereum); // Create a web3 instance
            const contract = new web3.eth.Contract(contractABI, contract_address);

            console.log('MetaMask connected');
            return { contract, userAccount } // Return the contract instance
        } else {
            console.log('MetaMask not found');
            return null; // Return null if MetaMask is not available
        }
    };

    const handleSubmit = async () => {
        try {
            // Connect to Metamask
            const { contract, userAccount }=await metaSubmit();

            if (contract) {
                // Perform contract interaction here
                // For example, you can call contract methods or send transactions
                console.log('Contract instance:', contract);

                // Example: Call a contract method
                // const result = await contract.methods.someMethod().call();
                // console.log('Result of contract method:', result);

                // Example: Send a transaction to a contract method
                //fixing a mortgage amount of 0.4 ether for reporting tip
                //will use this same logic for reverse transaction once government view is made
                const tx = await contract.methods.submitTip().send({
                    from: userAccount,
                    value: ethers.parseEther('0.4'), // Send 0.4 ether with the transaction
                });
                console.log('Transaction hash:', tx.transactionHash);

                console.log('Form submitted!');
            } else {
                console.log('MetaMask not available.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handle=()=>{
        console.log(contract_address)
        console.log(contractABI)
    }

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

            {/* <label className={styles.formLabel}>
                Amount to Deduct:
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className={styles.formInput} />
            </label> */}

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