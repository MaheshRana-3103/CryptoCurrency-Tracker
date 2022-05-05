import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from './config/api';
import {chartDays} from './config/data'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
import SelectButton from './SelectButton';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const useStyles=makeStyles((theme)=>({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))
const Coininfo = ({coin}) => {
  const [historicaldata,Sethistoricaldata]=useState();
  const [days,setdays]=useState(1);
  const {currency}=CryptoState();
  const [flag,setflag] = useState(false);

  const fetchhistoricdata= async()=>{
    const {data}=await axios.get(HistoricalChart(coin.id,days,currency));
    setflag(true);
    Sethistoricaldata(data.prices);
  }
  console.log("data",historicaldata);
  useEffect(()=>{
    fetchhistoricdata();
  },[currency,days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const classes=useStyles();
  return (
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
        {!historicaldata | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (<>
        <Line
        data={{
          labels:historicaldata.map((coin)=>{
            let date=new Date(coin[0]);
            let time=
            date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}`
            :`${date.getHours()}:${date.getMinutes()}`

            return date===1?time:date.toLocaleDateString();
          }),
          datasets:[
            { data:historicaldata.map((coin)=>coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            }
          ]
        }}
        options={{
          elements:{
            point:{
              radius:1,
            },
          },
        }}
        />
        </>)
        }
        <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
        >
          {chartDays.map(day=>(
            <SelectButton
            onClick={() => {setdays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
        </div>
        
      </ThemeProvider>
  )
}

export default Coininfo
