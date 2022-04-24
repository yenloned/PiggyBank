import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {LoginIDContext} from "../context/LoginContext";
import {LoginStatusContext} from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import {userDebtContext} from "../context/UserContext";

import without_debt from "../material/pictures/without_debt.png"

import "./debt.css";
import "./profile.css";



const Debt = () => {
    Axios.defaults.withCredentials = true;

    const {loginID} = useContext(LoginIDContext);
    const {loginStatus} = useContext(LoginStatusContext);
    const {userDebt, setUserDebt} = useContext(userDebtContext);

    const [payDebtMsg, setPayDebtMsg] = useState("")

    const navigate = useNavigate()

    //get all debt information of that user from database
    const GetDebt = () => {
        Axios.post("http://localhost:3005/profile/get_debt", {
            searchingID: loginID
        }).then((response) => {
            if (response.data.length){
                //save the data recieved from backend into component
                setUserDebt(response.data)
            }
        })
    }

    useEffect(() => {
        if (!userDebt.length){
            GetDebt()
        }
    })

    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    //paying the debt, take reference number as parameter
    const paydebt = (ref) => {
        //every debt information would have a reference number, select them by the reference number
        Axios.post("http://localhost:3005/account/get_debt_byref", {
            searchingRef: ref
        }).then((debt) => {
            //check if user have enough balance to pay the debt
            Axios.post("http://localhost:3005/profile/check_balance", {
                payerID: loginID,
                check_amount: debt.data.total
            }).then((canPay) => {
                //If yes, pay the debt by sending the request to backend
                if(canPay.data.length){
                    Axios.post("http://localhost:3005/account/pay_debt", {
                        debtAmount: debt.data.total,
                        searchingRef: ref,
                        searchingID: loginID
                    })
                    //reset error message
                    setPayDebtMsg("");
                    //refresh the page
                    window.location.reload();
                //If no, update componenet to display error message
                }else{
                    setPayDebtMsg("Failed to pay debt, please verifiy if balance amount is valid.")
                }
            })
        })
    }


    return (
        <div className="Profile">
        {loginStatus && userDebt ? (
            <div>
            <div className="debt_topic">
                <i className="fas fa-arrow-alt-circle-left" onClick={()=> navigate("/profile")}></i> Debt
            </div>
            {userDebt.length ? 
            <div>
            <div className="debt_row">
                <div>Total</div><div>Monthly</div><div>Tenor</div><div>Type</div><div>Start Date</div><div>Action</div>
            </div>
            <div className="debt_info">
            {userDebt.map((data, key) => {
                return(
                    <div className="debt_info_row" key={key}>
                        <div className="profile_userdata">HKD {String(data.total)}</div>
                        <div className="profile_userdata">HKD {String(data.monthly)}</div>
                        <div className="profile_userdata">{String(data.tenor)} Months</div>
                        <div className="profile_userdata">{String(data.type)}</div>
                        <div className="profile_userdata">{String(data.date.slice(0,10))}</div>
                        <div className="debt_paybutton">
                            <div className="debt_paytxt" onClick={()=> paydebt(data.ref)}>Pay Debt </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="debt_msg">
                {payDebtMsg ? payDebtMsg : ""}
            </div>
            </div>
            :
            <div className="debt_notexist">
                <div className="debt_notexist_png">
                    <img loading="lazy" src={without_debt} width='300' alt=""/>
                </div>
                <div className="debt_notexist_txt">
                    Well, look like you don't have any debt so far.
                </div>
                <div className="debt_notexist_goback">
                    <button><a href="/profile">Back to Profile</a></button>
                </div>
            </div>
            }
            </div>
        )
        :
        ""
        }
        </div>
    )


}

export default Debt;