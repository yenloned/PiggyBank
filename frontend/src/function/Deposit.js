import React, {useContext, useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './function.css';

import cash_deposit from "../material/pictures/cash_deposit.png";

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

const Deposit = () => {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    const [deposit_amount, setDeposit_Amount] = useState(0)
    const [deposit_Msg, setDeposit_Msg] = useState("")

    //check input > check user balance > deposit
    const deposit = () =>{
        //check if the input make sense before sending it into backend
        if (deposit_amount <= 0){
            return setDeposit_Msg("Invalid input for deposit")
        }
        if (deposit_amount < 100){
            return setDeposit_Msg("Deposit amount should be at least 100HKD")
        }
        if (deposit_amount % 100){
            return setDeposit_Msg("Deposit amount should be the multiple of HKD100")
        }
        if (deposit_amount > 10000000){
            return setDeposit_Msg("Deposit amount is too large")
        }
        //deposit money into user account
        Axios.post("http://localhost:3005/function/deposit",{
        deposit_userid: loginID,
        deposit_amount: deposit_amount})
        //redirect user to transaction history page after the deposit
        window.location.replace('/history')
    }

    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    return (
        <div className="deposit">
            <div className="transfer_container">
                <div className="transfer_goback"><a className="fas fa-arrow-alt-circle-left" href="/profile"></a></div>
                <div className="transfer_payee_choice">
                    Deposit
                </div>
                <div className="transfer_choice_icon">
                    <img src={cash_deposit} width='120' alt=""/>
                </div>
                <div className="transfer_amount">
                    <div>HKD Amount</div>
                    <div className="transfer_amount_input"><input type="number" onChange={(e) => {setDeposit_Amount(e.target.value);}} />
                    </div>
                </div>
                <div className="profile_checkPasswordFail">{deposit_Msg}</div>
                <div className="transfer_confirm" onClick={deposit}>
                    Confirm
                </div>
            </div>
        </div>
    )
}

export default Deposit;