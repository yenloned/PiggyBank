import React, {useContext, useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './function.css';
import Footer from '../comps/Footer';

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

const Loan = () => {

    Axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })


    return (
        <h1>
            Loan
            <Footer/>
        </h1>
    )
}

export default Loan;