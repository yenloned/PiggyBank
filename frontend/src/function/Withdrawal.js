import React, {useContext, useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './function.css';

import cash_withdrawal from "../material/pictures/cash_withdrawal.png";

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

const Withdrawal = () => {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext);
    const {loginID, setLoginID} = useContext(LoginIDContext);

    const [withdrawal_amount, setWithdrawal_Amount] = useState(0)
    const [withdrawal_Msg, setWithdrawal_Msg] = useState("")

    const check_amount = () =>{
        if (withdrawal_amount <= 0){
            return setWithdrawal_Msg("Invalid withdrawal amount")
        }
        if (withdrawal_amount < 100){
            return setWithdrawal_Msg("Withdrawal amount should be at least HKD100")
        }
        if (withdrawal_amount % 100){
            return setWithdrawal_Msg("Withdrawal amount should be the multiple of HKD100")
        }
        Axios.post("http://localhost:3005/profile/check_balance",{
        payerID: loginID,
        check_amount: withdrawal_amount})
        .then((response) =>{
            if (response.data.length > 0){
                Axios.post("http://localhost:3005/function/withdrawal",{
                withdrawal_userid: loginID,
                withdrawal_amount: withdrawal_amount})
            }else{
                return setWithdrawal_Msg("You don't have enough money!")
            }
        })
    }

    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    return (
        <div className="withdrawal">
            <div className="transfer_container">
                <div className="transfer_goback"><a className="fas fa-arrow-alt-circle-left" href="/profile"></a></div>
                <div className="transfer_payee_choice">
                    Withdrawal
                </div>
                <div className="transfer_choice_icon">
                    <img src={cash_withdrawal} width='120' alt=""/>
                </div>
                <div className="transfer_amount">
                    <div>HKD Amount</div>
                    <div className="transfer_amount_input"><input type="number" onChange={(e) => {setWithdrawal_Amount(e.target.value);}} />
                    </div>
                </div>
                <div className="profile_checkPasswordFail">{withdrawal_Msg}</div>
                <div className="transfer_confirm" onClick={check_amount}>
                    Confirm
                </div>
            </div>
        </div>
    )
}

export default Withdrawal;