import React,{ useState,useEffect } from 'react';
import {useMoralis} from 'react-moralis'
import './FundlogicComp'
import FundlogicComp from './FundlogicComp';
export default function TestComponent(){

    const {enableWeb3,account,isWeb3Enabled,Moralis,deactivateWeb3,isWeb3EnableLoading}=useMoralis()

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
    return <div>
        {account?(<div>Connected to {account}</div>):(<button onClick={async ()=>{
            await enableWeb3()
            if (typeof window !== "undefined")
            {
                window.localStorage.setItem("connected","injected")
            }
            }}>Connect</button>)}

        <FundlogicComp></FundlogicComp>
        
    </div>

}

