import React, {useContext, useEffect, useLayoutEffect} from "react";
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

    const navigate = useNavigate()

    useEffect(() => {
        const GetDebt = async () => {
            await Axios.post("http://localhost:3005/account/get_debt", {
                searchingID: loginID
            }).then((response) => {
                if (response.data.length){
                    setUserDebt(response.data)
                }
            })
        }

        if (!userDebt.length){
            GetDebt()
        }
    })

    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    const paydebt = (ref) => {
        Axios.post("http://localhost:3005/account/pay_debt", {
            searchingID: loginID,
            searchingRef: ref
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
                    <button onClick={()=>navigate("/profile")}>Back to Profile</button>
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