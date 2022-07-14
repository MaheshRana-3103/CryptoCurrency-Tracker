import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { CoinList } from './components/config/api';
import { auth ,db} from './firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { doc ,onSnapshot} from '@firebase/firestore';

const Crypto=createContext();

const CryptoContext = ({children}) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency,Setcurrency]=useState("INR");
    const [symbol,Setsymbol]=useState("₹");
    const [user,setUser]=useState(null);
    const [alert,SetAlert]=useState({
        open:false,
        message:"",
        type:"success",
    });
    const[watchlist,setWatchlist]=useState([])

    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user?.uid);
          var unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
              console.log(coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user)setUser(user);
            else setUser(null);

            console.log(user);
        })
    },[]);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
        setCoins(data);
        setLoading(false);
    };

    useEffect(()=>{
        if(currency==="INR")Setsymbol("₹");
        else if(currency==="USD")Setsymbol("$");

    },[currency]);
    return (
    <Crypto.Provider value={{coins,currency,symbol,Setcurrency,fetchCoins,loading,alert,SetAlert,user,watchlist}}>{children}</Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
    return useContext(Crypto);
}
