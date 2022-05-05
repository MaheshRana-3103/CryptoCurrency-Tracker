import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'

const Crypto=createContext();

const CryptoContext = ({children}) => {
    const [currency,Setcurrency]=useState("INR");
    const [symbol,Setsymbol]=useState("₹");
    useEffect(()=>{
        if(currency==="INR")Setsymbol("₹");
        else if(currency==="USD")Setsymbol("$");

    },[currency]);
    return (
    <Crypto.Provider value={{currency,symbol,Setcurrency}}>{children}</Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
    return useContext(Crypto);
}
