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
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_debt", {
            searchingID: loginID
        }).then((response) => {
            if (response.data.length){
                //save the data recieved from backend into component
                setUserDebt(response.data)
            }
        })
    }

    //get debt information once user enter the page
    useEffect(() => {
        if (!userDebt.length){
            GetDebt()
        }
    })

    //redirect user if he is not logined
    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    //paying the debt, take reference number as parameter
    const paydebt = (ref) => {
        //every debt information would have a reference number, select them by the reference number
        Axios.post("https://piggbank-backend-api.herokuapp.com/account/get_debt_byref", {
            searchingRef: ref
        }).then((debt) => {
            //check if user have enough balance to pay the debt
            Axios.post("https://piggbank-backend-api.herokuapp.com/profile/check_balance", {
                payerID: loginID,
                check_amount: debt.data.total
            }).then((canPay) => {
                //If yes, pay the debt by sending the request to backend
                if(canPay.data.length){
                    Axios.post("https://piggbank-backend-api.herokuapp.com/account/pay_debt", {
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
        /*  Component usage to display the debt information and error message
            Conditional statement is used to determine if showing the debt information and error message
            map method used to display all debt information from the list of objects (component)
            function of pay debt is implemented with data validation and balance checking*/
        <div className="Profile">
        {loginStatus && userDebt ? (
            <div>
            <div className="debt_topic">
                <a href="/profile"><i className="fas fa-arrow-alt-circle-left" /></a> Debt
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
                        <div className="profile_userdata">{String(data.date.split(',')[0])}</div>
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
                    <img loading="lazy" src={without_debt} width='192' alt=""/>
                </div>
                <div className="debt_notexist_txt">
                    You do not have any Debt in current.
                </div>
                <div className="debt_notexist_goback">
                    <a href="/loan">Check out PiggyBank Loan</a>
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