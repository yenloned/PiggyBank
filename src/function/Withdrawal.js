import React, {useContext, useLayoutEffect, useState} from "react";
import Axios from "axios";
import './function.css';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

import withdrawal_icon2 from "../material/icons/withdrawal_icon2.png";

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

const Withdrawal = () => {
    Axios.defaults.withCredentials = true;

    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    const [withdrawal_amount, setWithdrawal_Amount] = useState(0)
    const [withdrawal_Msg, setWithdrawal_Msg] = useState("")

    //check input > check user balance > withdrawal
    const check_amount = () =>{
        //check if the input makes sense before sending into backend
        if (withdrawal_amount <= 0){
            return setWithdrawal_Msg("Invalid withdrawal amount")
        }
        if (withdrawal_amount < 100){
            return setWithdrawal_Msg("Withdrawal amount should be at least HKD100")
        }
        if (withdrawal_amount % 100){
            return setWithdrawal_Msg("Withdrawal amount should be the multiple of HKD100")
        }
        //check if user have enough money to perform withdrawal
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.CHECK_BALANCE}`,{
        payerID: loginID,
        check_amount: withdrawal_amount})
        .then((response) =>{
            //If yes, perform withdrawal
            if (response.data.length > 0){
                Axios.post(`${API_BASE_URL}${API_ENDPOINTS.WITHDRAWAL}`,{
                withdrawal_userid: loginID,
                withdrawal_amount: withdrawal_amount})
                //redirect user to transaction history page after the withdrawal
                window.location.replace('/history')
            }else{
                //If no, update component to display error message
                return setWithdrawal_Msg("You don't have enough money!")
            }
        })
    }

    useLayoutEffect(() => {
        if (!loginStatus){
            window.location.replace('/login')
        }
    })

    return (
        <div className="withdrawal">
            <div className="transfer_container">
                <div className="transfer_goback"><a href="/profile"><i className="fas fa-arrow-alt-circle-left" /></a></div>
                <div className="transfer_payee_choice">
                    Withdrawal
                </div>
                <div className="transfer_choice_icon">
                    <img src={withdrawal_icon2} width='120' alt=""/>
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