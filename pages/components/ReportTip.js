import { contractABI,contract_address } from '../../Contracts/ContractDetails.js';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useState,useEffect } from 'react';
import ethers from 'ethers'
import styles from '../../styles/ReportTip.module.css';
import TestComponent from './TestComponent.js';


export default function FundlogicComp(){

    const [url,setUrl] = useState('');
    const [description,setDescription] = useState('');
    const [walletId,setWalletId] = useState('');
    const [confirm,setConfirm] = useState(false);


    const {id,isWeb3Enabled}=useMoralis()
    const chainId= 11155111;
    const[fee,setFee]=useState("0")
    const {runContractFunction: submitTip}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contract_address,
        functionName:"submitTip",
        params:{},
        msgValue:fee
    })

    useEffect(()=>{
        if (isWeb3Enabled)
        {
            setFee('100000000000000000')
        }   
    })

    return(
        <>
        <TestComponent></TestComponent>
        {/* <div>
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
                disabled={!confirm} onClick={async function(){await submitTip()}}>Submit tip</button>
        </div> */}
        </>

    )
}