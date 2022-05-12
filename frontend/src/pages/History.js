import React, {useState, useContext, useEffect, useLayoutEffect} from "react";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

import no_history_detail from "../material/pictures/no_history_detail.png"

import "./debt.css"
import "./history.css"
import "./profile.css"

const History = () => {

    const navigate = useNavigate()

    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    const [userHistory, setUserHistory] = useState([])

    //redirect user if not login
    useLayoutEffect(() => {
        if (!loginStatus){
            navigate('/login')
        }
    })

    useEffect(async () => {
        if (!userHistory.length){
            await Axios.post("http://localhost:3005/profile/get_history",{
            searchingID: loginID})
            .then((history) => {
                if (history.data.length){
                    //update component to store all history sent from backend
                    setUserHistory(history.data)
                }
            })
        }
    })

    return (
        /*  Component is used to determine if showing the transaction history to user
            map method is used to display all information from a list of objects */
        <div className="Profile">
            <div className="debt_topic">
                <a href="/profile"><i className="fas fa-arrow-alt-circle-left"></i> Transaction History</a>
            </div>
            {userHistory.length
            ?
                <div>
                    {userHistory.map((data, key) => {
                        return (
                            <div className="history_block" key={key}>
                                <div className="history_row1">
                                    <div className="history_title">
                                        Reference Number: <div className="history_data">{data.ref}</div>
                                    </div>
                                    <div className="history_title">
                                        From ID: <div className="history_data">{data.fromwho}</div>
                                    </div>
                                    <div className="history_title">
                                        To ID: <div className="history_data">{data.towho}</div>
                                    </div>
                                </div>
                                <div className="history_row2">
                                    <div className="history_title">
                                        Type: <div className="history_data">{data.type}</div>
                                    </div>
                                    <div className="history_title">
                                        HKD Amount: <div className="history_data">{data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                    </div>
                                </div>
                                <div className="history_date">
                                    <div className="history_title">
                                        Date Time: <div className="history_data">{data.date}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            :
                <div className="debt_notexist">
                    <div className="debt_notexist_png">
                        <img loading="lazy" src={no_history_detail} width='300' alt=""/>
                    </div>
                    <div className="debt_notexist_txt">
                        Literally Nothing Here
                    </div>
                    <div className="hisotry_notexist_goback">
                        <button><a href="/profile">Back to Profile</a></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default History;