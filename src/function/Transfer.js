import React, {useContext, useLayoutEffect, useState} from "react";
import Axios from "axios";
import './function.css';

import search_payee from "../material/pictures/search_payee.png";
import search_id from "../material/pictures/search_id.png";
import choosing from "../material/pictures/choosing.png";
import choosing2 from "../material/pictures/choosing2.png";

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";
import {userPayeeContext} from "../context/UserContext";


const Transfer = () =>{
    Axios.defaults.withCredentials = true;

    //shared components
    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);
    const {userPayee, setUserPayee} = useContext(userPayeeContext);

    //components
    const [transferChoice, setTransferChoice] = useState("")
    const [transfer_payee, setTransfer_payee] = useState("")
    const [transfer_amount, setTransfer_Amount] = useState(0)
    const [transfer_errormsg, setTransfer_Errormsg] = useState("")

    //get Payee Information by user ID
    const get_payee = () => {
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_payee",{
        searchingID: loginID})
        .then((response) => {
            if (response.data){
                //input all of them into the component for frontend display
                setUserPayee(response.data)
            }
        })
    }

    //update component status to render the page according to user choice (By Payee ID)
    const transfer_by_payee = () =>{
        get_payee()
        setTransferChoice("by_payee")
    }

    //update component status to render the page according to user choice (By ID)
    const transfer_by_id = () => {
        get_payee()
        setTransferChoice("by_id")
    }

    //check if user exist before performing the money transfer
    const check_user = () =>{
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/check_user",{
        payee_id_checkuser: transfer_payee
        }).then((checkuser_result) =>{
            //If it is existed, perform transfer_money
            if(checkuser_result.data !== ''){
                transfer_money()
            //If no, update component to display the error message
            }else{
                setTransfer_Errormsg("Payee ID does not exist.")
            }
        })
    }

    //transfer the money to target
    const transfer_money = () =>{
        //check if the transfer amount make sense before sending it to backend
        if (transfer_payee === loginID){
            return setTransfer_Errormsg("You can not transfer money to yourself.")
        }
        if (!transfer_amount || transfer_amount <= 0){
            return setTransfer_Errormsg("Invalid transfer amount.")
        }
        if (!transfer_payee){
            return setTransfer_Errormsg("Please select a payee.")
        }
        if (transfer_amount > 100000000){
            return setTransfer_Errormsg("Transaction amount is too large.")
        }
        //check if user have enough balance to transfer that amount
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/check_balance",{
        payerID: loginID,
        check_amount: transfer_amount})
        .then((response) =>{
            //If yes, do the transfer
            if (response.data.length > 0){
                Axios.post("https://piggbank-backend-api.herokuapp.com/function/transfer",{
                transfer_payerID: loginID,
                transfer_amount: transfer_amount,
                transfer_payeeID: transfer_payee})
                //redirect user to transaction history page after the money transfer
                window.location.replace('/history')
            //If no, update component to display error message
            }else{
                return setTransfer_Errormsg("You don't have enough money!")
            }
        })
    }

    useLayoutEffect(() => {
        if (!loginStatus){
            window.location.replace('/login')
        }
    })

    return(
        /*  Component will be used for transfer choice in the beginning along with conditional statement
            Then, each page may contain other components for page rendering, like amount, payee selected*/
        <div className="transfer">
            { transferChoice === "" &&
            <div className="transfer_choice_container">
                <div className="transfer_choice" onClick={(transfer_by_payee)}>
                    <div className="transfer_choice_icon">
                        <img src={search_payee} width='156' alt=""/>
                    </div>
                    <div className="transfer_choice_title">
                        Select Payee
                    </div>
                </div>
                <div className="transfer_choice" onClick={transfer_by_id}>
                    <div className="transfer_choice_icon">
                        <img src={search_id} width='156' alt=""/>
                    </div>
                    <div className="transfer_choice_title">
                        Select ID
                    </div>
                </div>
            </div>
            }

            { transferChoice === "by_payee" &&
            <div className="by_payee">
                <div className="transfer_payee_list">
                    <div className="transfer_payee_bar">
                        <div className="transfer_payee_information">
                            <div className="transfer_goback"><a className="fas fa-arrow-alt-circle-left" href="/transfer"></a></div>
                            <div className="profile_payee_id">Payee ID</div>
                            <div className="profile_payee_name">Payee Name</div>
                        </div>
                        {userPayee.map(data => {
                            return(
                                <div className="transfer_payee_choose" onClick={() => setTransfer_payee(data.payee_id)}>
                                    {transfer_payee == data.payee_id ?
                                    <div className="transfer_tickbox"><input type="radio" checked="checked" /></div>
                                    :
                                    <div className="transfer_not_tickbox"><input type="radio" /></div>
                                    }
                                    <div className="profile_userdata">{data.payee_id}</div>
                                    <div className="profile_userdata">{data.payee_name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="transfer_container">
                    <div className="transfer_payee_choice">
                        Choose your payee
                    </div>
                    <div className="transfer_choice_icon">
                        <img src={choosing} width='120' alt=""/>
                    </div>
                    <div className="transfer_current">
                        Current Payee ID
                    </div>
                    <div className="transfer_current_id">
                        {transfer_payee == "" ? "-" : transfer_payee}
                    </div>
                    <div className="transfer_amount">
                        <div>HKD Amount</div>
                        <div className="transfer_amount_input"><input type="number" onChange={(e) => {setTransfer_Amount(e.target.value);}} />
                        </div>
                    </div>
                    <div className="profile_checkPasswordFail">{transfer_errormsg}</div>
                    <div className="transfer_confirm" onClick={transfer_money}>
                        Confirm
                    </div>
                </div>
            </div>
            }

            {transferChoice === "by_id" &&
            <div className="by_id">
                <div className="transfer_container">
                    <div className="transfer_goback"><a className="fas fa-arrow-alt-circle-left" href="/transfer"></a></div>
                    <div className="transfer_payee_choice">
                        Search the ID
                    </div>
                    <div className="transfer_choice_icon">
                        <img src={choosing2} width='120' alt=""/>
                    </div>
                    <div className="transfer_current">
                        Enter Payee ID
                    </div>
                    <div className="transfer_current_id">
                        <div className="transfer_amount_input"><input type="number" onChange={(e) => {setTransfer_payee(e.target.value);}} />
                        </div>
                    </div>
                    <div className="transfer_amount">
                        <div>HKD Amount</div>
                        <div className="transfer_amount_input"><input type="number" onChange={(e) => {setTransfer_Amount(e.target.value);}} />
                        </div>
                    </div>
                    <div className="profile_checkPasswordFail">{transfer_errormsg}</div>
                    <div className="transfer_confirm" onClick={check_user}>
                        Confirm
                    </div>
                </div>
            </div>    
            }
        </div>
    )
}

export default Transfer