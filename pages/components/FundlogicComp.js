import { contractABI,contract_address } from '../../Contracts/ContractDetails.js';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useState,useEffect } from 'react';
import ethers from 'ethers'
import styles from '../../styles/ReportTip.module.css';


export default function FundlogicComp(){

    const [url,setUrl] = useState('');
    const [description,setDescription] = useState('');
    const [walletId,setWalletId] = useState('');
    const [confirm,setConfirm] = useState(false);


    const {id,isWeb3Enabled,account}=useMoralis()
    const chainId= 11155111;
    const[fee,setFee]=useState("0")

    const[augFee,setAugFee]=useState("0")
    const {runContractFunction: submitTip}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contract_address,
        functionName:"submitTip",
        params:{},
        msgValue:fee
    })

    const {runContractFunction: getTips}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contract_address,
        functionName:"getTips",
        params:{"user":account},
    })

    
    const handleClick= async()=>{
        try {
            console.log("hi");
            console.log(account)
            await submitTip()
            const tipList = await getTips(account);
            console.log(tipList.length)
            console.log(tipList);
        } catch (error) {
            console.error("Error fetching tips:", error);
        }
    }


    
    useEffect(()=>{
        if (isWeb3Enabled)
        {
            setFee('100000000000000000')
            setAugFee('100000000000000000')
        }   
    })


    return(
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


            {/* <button className={confirm ? styles.submitButton : styles.submitButtonDisabled}
                disabled={!confirm} onClick={async function(){console.log("hi");await submitTip()}}>Submit tip</button> */}

            <button className={confirm ? styles.submitButton : styles.submitButtonDisabled}
                disabled={!confirm} onClick={handleClick}>Submit tip</button>
        </div>

    )
}