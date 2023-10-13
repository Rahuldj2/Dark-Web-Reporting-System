import React,{ useState,useEffect } from 'react';
import styles from '../../styles/ReviewTip.module.css';
// import Login from './Login';

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

import { useMoralis, useWeb3Contract } from 'react-moralis';
import { contractABI, contract_address } from '../../Contracts/ContractDetails.js';
import ethers from 'ethers';
import TestComponent from './TestComponent';

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






const ReviewTip = () => {
 
    
    const {enableWeb3,Moralis,id,isWeb3Enabled,account,deactivateWeb3,isWeb3EnableLoading}=useMoralis()
    const[AugFee,setAugFee]=useState('')

    const[TipperAddress,SetTipperAddress]=useState('0')

    const[TipIndex,SetTipIndex]=useState('0')

    const[TF,SetTf]=useState(false)

    const {runContractFunction: verifyTip}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contract_address,
        functionName:"verifyTip",
        params:{"tipper":TipperAddress,"tipIndex":TipIndex,"_isTrue":TF,"augmentationAmount":AugFee},
    })
    
    
    useEffect(()=>{
        if (TF && isWeb3Enabled)
        {
            setAugFee('100000000000000000')
        }
        else
        {
            setAugFee('0')
        }
            
         
    })

const handleApprove = async(tip) => {
   
    console.log(`Approving tip: ${tip.tip_id}`);
    console.log(`Approving tip: ${tip.walletId}`);
    SetTipperAddress(tip.walletId)
    SetTipIndex(tip.index)
    SetTf(true)
    console.log(TipperAddress)
    console.log(TipIndex)
    console.log(!TF)
    console.log(AugFee)  

   await verifyTip(TipperAddress,TipIndex,!TF,AugFee)
       // Fetch the Firestore document for the specific account
       const userAccount = tip.walletId; // Replace with the actual user account
       const firestore = getFirestore(app);
       const userDocRef = doc(firestore, 'users', userAccount);
       
       // Update the tip with "solved = true"
       getDoc(userDocRef)
           .then((userDocSnapshot) => {
               if (userDocSnapshot.exists()) {
                   const userDocData = userDocSnapshot.data();
                   const tipsArray = userDocData.tips;
   
                   // Find the index of the tip to update in the tips array
                   const tipIndex = tip.index;
   
                   if (tipIndex !== -1) {
                       // Update the 'solved' field to true for the specific tip
                       tipsArray[tipIndex].solved = true;
                       tipsArray[tipIndex].status = true;
                       // Update the Firestore document with the updated tips array
                       return setDoc(userDocRef, { tips: tipsArray }, { merge: true });
                   } else {
                       console.error(`Tip not found in the user's tips array.`);
                   }
               } else {
                   console.error(`User document for ${userAccount} not found in Firestore.`);
               }
           })
           .then(() => {
               console.log(`Tip updated successfully on Firestore.`);
           })
           .catch((error) => {
               console.error('Error updating tip in Firestore:', error);
           });
    // console.log(result)
    // Implement logic to approve the tip (you can update the tip's 'approved' status).
};

const handleDisapprove = async(tip) => {
    console.log(`disApproving tip: ${tip.tip_id}`);
    console.log(`disApproving tip: ${tip.walletId}`);
    SetTipperAddress(tip.walletId)
    SetTipIndex(tip.index)
    SetTf(false)
    setAugFee('0')
  
    console.log(TipperAddress)
    console.log(TipIndex)
    console.log(!TF)
    console.log(AugFee)
    // Implement logic to disapprove the tip (you can update the tip's 'approved' status).
    await verifyTip(TipperAddress,TipIndex,!TF,AugFee)

    
     // Fetch the Firestore document for the specific account
     const userAccount = tip.walletId; // Replace with the actual user account
     const firestore = getFirestore(app);
     const userDocRef = doc(firestore, 'users', userAccount);
     
     // Update the tip with "solved = true"
     getDoc(userDocRef)
         .then((userDocSnapshot) => {
             if (userDocSnapshot.exists()) {
                 const userDocData = userDocSnapshot.data();
                 const tipsArray = userDocData.tips;
 
                 // Find the index of the tip to update in the tips array
                 const tipIndex = tip.index;
 
                 if (tipIndex !== -1) {
                     // Update the 'solved' field to true for the specific tip
                     tipsArray[tipIndex].solved = false;
                     tipsArray[tipIndex].status = true;
 
                     // Update the Firestore document with the updated tips array
                     return setDoc(userDocRef, { tips: tipsArray }, { merge: true });
                 } else {
                     console.error(`Tip not found in the user's tips array.`);
                 }
             } else {
                 console.error(`User document for ${userAccount} not found in Firestore.`);
             }
         })
         .then(() => {
             console.log(`Tip updated successfully on Firestore.`);
         })
         .catch((error) => {
             console.error('Error updating tip in Firestore:', error);
         });

};


    const FloatingWindow = ({ tip,onClose }) => (
        <div className={styles.floatingWindow}>
            <h2>Tip Details</h2>
            <p><strong>Tip ID:</strong> {tip.tip_id}</p>
       
     
            <p><strong>Wallet ID:</strong> {tip.walletId || 'N/A'}</p>
            <p><strong>Amount of Stake:</strong> {'0.1 Ether'}</p>
            <p><strong>URL:</strong> {tip.url}</p>
            <p><strong>Approval Status:</strong> {tip.status ? 'Action Taken' : 'Pending'}</p>
    
            {/* View other tips button */}
            
    
    
            {/* Approve button with loader */}
            <button className={`${styles.button} ${styles.loaderButton}`} onClick={async ()=>{await handleApprove(tip)}}>
                {tip.approved ? 'Approved' : 'Approve'}
                {tip.approving && <div className={styles.loader} />}
            </button>
    
            <button className={styles.button} onClick={async()=>{await handleDisapprove(tip)}}>
                Disapprove
            </button>
    
            <button className={styles.closeButton} onClick={onClose}></button>
        </div>
    );
    
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
    const[tipsData,setTipsData]=useState([]);

    
    
useEffect(() => {
    // Now TF is guaranteed to have its updated value here
    // console.log(TF)
    SetTf(TF)
}, [TF]);
    useEffect(() => {
        const fetchTipsFromFirestore = async () => {
            const firestore = getFirestore(app);
            const tipsCollectionRef = collection(firestore, 'users'); // Replace 'your_collection' with your actual collection name
    
            try {
                const querySnapshot = await getDocs(tipsCollectionRef);
                const tipData = [];
    
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
    
                    if (Array.isArray(documentData.tips)) {
                        // Assuming 'tips' is the array of maps
                        documentData.tips.forEach((tip) => {
                            tipData.push({
                                tip_id: tip.tip_id,
                                url: tip.url,
                                walletId: tip.walletId,
                                index: tip.index,
                                description: tip.description,
                                solved: tip.solved,
                                status:tip.status
                            });
                        });
                    } else {
                        console.warn('Tips array is missing or not an array in document:', doc.id);
                    }
                });
    
                console.log('Retrieved tips from Firestore:', tipData);

                setTips(tipData);
            } catch (error) {
                console.error('Error fetching tips from Firestore:', error);
            }
        };
    

        // Call the function to fetch tips when the component mounts
   

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

    useEffect(
        ()=>{
            if (isWeb3Enabled) return

            if (typeof window!=="undefined")
            {
                if (window.localStorage.getItem("connected"))
                {
                    enableWeb3()
                }
            }
            console.log(isWeb3Enabled)
        },[isWeb3Enabled]
    )

    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            console.log(`Acc changed`)
            if (account==null)
            {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null")

            }
        })
    },[])
    return (
        <>
        {/* <TestComponent></TestComponent>
         */}
         
         {/* {account?(<div>Connected to {account}</div>):(<button onClick={async ()=>{
            await enableWeb3()
            if (typeof window !== "undefined")
            {
                window.localStorage.setItem("connected","injected")
            }
            }}>Connect</button>)} */}

        <div className={styles.reviewTipContainer}>
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
      className={`${styles.tableHeader} ${styles.clickable}`}
      onClick={() => handleSort('id')}
    >
      Tip ID
    </th>
    <th
      className={`${styles.tableHeader} ${styles.clickable}`}
      onClick={() => handleSort('url')}
    >
      URL
    </th>
    <th
      className={`${styles.tableHeader} ${styles.clickable}`}
      onClick={() => handleSort('url')}
    >
      Description
    </th>
  </tr>
</thead>

                        <tbody>
                            {/* {console.log(tips)} */}
                            {tips.map((tip) => (
                               <tr key={tip.id} onClick={() => handleTipClick(tip)} className={tip.status ? styles.greenRow : styles.redRow}>
                                    <td className={styles.tableCell}>{tip.tip_id}</td>
                                    <td className={styles.tableCell}>{tip.url.slice(0,30)}...</td>
                                    <td className={styles.tableCell}>{tip.description}</td>
                                    {/* <td className={styles.tableCell} suppressHydrationWarning>
                                        {formatDate(tip.datetime)}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedTip && (
                        <FloatingWindow tip={selectedTip} onClose={handleCloseFloatingWindow} />
                    )}
                </div>
            {/* {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                // Render ReviewTip content here
                
            )} */}
        </div>
        </>
    );
};

export default ReviewTip;