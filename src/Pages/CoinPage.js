import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import parse from 'html-react-parser';
import ReactHTMLParser from 'react-html-parser';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Coininfo from '../components/Coininfo';
import { SingleCoin } from '../components/config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../components/CoinsTable';

// const parse=require("react-html-parser");
const useStyles=makeStyles((theme)=>({
  container:{
    display:"flex",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems:"center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },

}))

const CoinPage = () => {
  
  const {id}=useParams();
  const [coin,Setcoin]=useState();

  const {currency,symbol}=CryptoState(); 

  const fetchCoins=async()=>{
    const {data}=await axios.get(SingleCoin(id));
    Setcoin(data);
  }
  useEffect(()=>{
    fetchCoins();
  },[]);

  const classes=useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom:20}}
        />
        <span></span>
        <Typography 
        variant="h3"
        className={classes.heading}
        >{coin?.name}</Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHTMLParser(coin?.description.en.split(". ")[0])}
          {/* {parse(coin?.description.en.split(". ")[0])}. */}
        </Typography>
      <div className={classes.marketData}>
        <span style={{display:"flex"}}>
        <Typography variant="h5"className={classes.heading}>Rank :</Typography>
        &nbsp;&nbsp;
        <Typography
        variant="h5"
        style={{
          fontFamily:"Montserrat"
        }}
        >
        {coin?.market_cap_rank}
        </Typography>
        </span>
        <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
      </div>
      </div>
      
      
      {/* chart */}
      <Coininfo coin={coin}/>

    </div>
  )
}

export default CoinPage