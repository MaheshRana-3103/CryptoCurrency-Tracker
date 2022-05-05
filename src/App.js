import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles(() => ({
  App: {
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
  },
})); 


function App() {
  const classes=useStyles();

  return (
    <BrowserRouter forceRefresh={true}>
       <div className={classes.App}>
         <Header/>
         <Route path="/" component={HomePage} exact />
         <Route path="/coins/:id" component={CoinPage}/>
       </div>
    </BrowserRouter>
  );
}

export default App;
