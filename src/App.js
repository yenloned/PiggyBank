import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import Navbar from './comps/NavBar';
import LoginNavbar from './comps/LoginNavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Feature from './pages/Feature';
import Login from './login/Login';
import Register from './login/Register';
import Profile from './pages/Profile';
import ResetPassword from './login/ResetPassword';
import NotFound from './pages/NotFound';

import Account from './pages/FAQ/Account';
import Development from './pages/FAQ/Development';
import General from './pages/FAQ/General';
import Transaction from './pages/FAQ/Transaction';
import Security from './pages/FAQ/Security';

import History from './pages/History';
import Debt from './pages/Debt';
import Transfer from './function/Transfer';
import Withdrawal from './function/Withdrawal';
import Deposit from './function/Deposit';
import Loan from './function/Loan'

import {LoginStatusContext} from "./context/LoginContext";
import {LoginIDContext} from "./context/LoginContext";
import {userPayeeContext} from "./context/UserContext";
import {userDebtContext} from "./context/UserContext";

function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginID, setLoginID] = useState(null);
  const [userPayee, setUserPayee] = useState([]);
  const [userDebt, setUserDebt] = useState([]);

  Axios.defaults.withCredentials = true;

    useEffect(()=> {
      /*
      //check if user have logined (by cookie session)
        Axios.get("https://piggbank-backend-api.herokuapp.com/account/loggedin")
        .then((response) => {
              //store user login status into component, which is shared with other files
              setLoginStatus(response.data.loggedIn);
              //check along with JWT
          */
              Axios.get("https://piggbank-backend-api.herokuapp.com/account/auth", {
              headers: {
                  "x-access-token" : localStorage.getItem("token")
                }
              }).then((JWTresponse) => {
                  console.log(JWTresponse)
                  //JWT and cookie both passed, then login success
                  if (JWTresponse.data.userid){
                    setLoginID(JWTresponse.data.userid)
                    setLoginStatus(true)
                  //only cookie passed, then logout (destory the cookie)
                  }else{
                    //Axios.get("https://piggbank-backend-api.herokuapp.com/account/logout")
                    //window.location.reload();
                    //window.location("/login");
                    setLoginID(0)
                    setLoginStatus(false)
                  }
              })
        }, [])

  return (
    /*It provides a router function for all the other files.
      Also perform as a useContext Provider which share the useContext component status to other files. */
    <BrowserRouter>
    <LoginStatusContext.Provider value={{loginStatus, setLoginStatus}}>
      <LoginIDContext.Provider value={{loginID, setLoginID}}>
        <userPayeeContext.Provider value={{userPayee, setUserPayee}}>
          <userDebtContext.Provider value={{userDebt, setUserDebt}}>
            {loginStatus ? (<LoginNavbar />) : (<Navbar />) }
            <Routes>
              <Route path='/' element={<Home />} exact />
              <Route path='/about' element={<About />}/>
              <Route path='/service' element={<Service />}/>
              <Route path='/feature' element={<Feature />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/resetpassword' element={<ResetPassword />}/>
              <Route path='*' element={<NotFound />}/>

              <Route path='/support=account' element={<Account />}/>
              <Route path='/support=development' element={<Development />}/>
              <Route path='/support=general' element={<General />}/>
              <Route path='/support=transaction' element={<Transaction />}/>
              <Route path='/support=security' element={<Security />}/>

              <Route path='/history' element={<History />}/>
              <Route path='/debt' element={<Debt />}/>
              <Route path='/transfer' element={<Transfer />}/>
              <Route path='/withdrawal' element={<Withdrawal />}/>
              <Route path='/deposit' element={<Deposit />}/>
              <Route path='/loan' element={<Loan />}/>
            </Routes>
            </userDebtContext.Provider>
          </userPayeeContext.Provider>
        </LoginIDContext.Provider>
      </LoginStatusContext.Provider>
    </BrowserRouter>
  );
}



export default App;
