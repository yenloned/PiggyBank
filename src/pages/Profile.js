import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import './profile.css';

import no_sub from "../material/pictures/no_sub.png"
import no_history from "../material/pictures/no_history.png"
import no_payee from "../material/pictures/no_payee.png"
import transfer_icon from "../material/icons/transfer_icon.png"
import withdrawal_icon from "../material/icons/withdrawal_icon.png"
import deposit_icon from "../material/icons/deposit_icon.png"
import logout_icon from "../material/icons/logout_icon.png"

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";
import {userPayeeContext} from "../context/UserContext";

const Profile = () => {
    Axios.defaults.withCredentials = true;

    //useContext for the checking if user is login, and who is the user
    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext);
    const {loginID, setLoginID} = useContext(LoginIDContext);

    //useState for the components need to be used below
    //user information
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("")
    const [userBalance, setUserBalance] = useState(0);
    const [userDebt, setUserDebt] = useState(0);
    const [userCredit, setUserCredit] = useState("")
    const [user2FA, setUser2FA] = useState("")
    const [userType, setUserType] = useState("")

    //payee registration
    const [payeeAdd, setPayeeAdd] = useState(false)
    const {userPayee, setUserPayee} = useContext(userPayeeContext);
    const [payeeAdd_ID, setPayeeAdd_ID] = useState("")
    const [payeeAdd_Name, setPayeeAdd_Name] = useState("")
    const [payeeAdd_Msg, setPayeeAdd_Msg] = useState("")

    //user subscription
    const [userSub, setUserSub] = useState([])

    //user history
    const [userHistory, setUserHistory] = useState([])

    //user password changing
    const [userCurrentPassword, setUserCurrentPassword] = useState("")
    const [userOldPassword, setUserOldPassword] = useState("")
    const [userNewPassword, setUserNewPassword] = useState("")
    const [userConfirmNewPassword, setUserConfirmNewPassword] = useState("")
    const [ResetPasswordMsg, setResetPasswordMsg] = useState("")
    const [checkPasswordFailMsg, setcheckPasswordFailMsg] = useState("")

    //user password termination
    const [userTerminatePassword, setUserTerminatePassword] = useState("")
    const [userTerminateConfirm, setUserTerminateConfirm] = useState("")
    const [userTerminateMsg, setUserTerminateMsg] = useState("")

    //changing pages inside profile page
    const [profile_button, set_profile_button] = useState("information");
    //show description of credit scoring
    const [credit_button, set_credit_button] = useState(false);


    const navigate = useNavigate()

    
    useEffect( () => {
        //get user information by useEffect, then save them into accordance components
        const GetInformation = async () =>{
            await Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_info",{
            searchingID: loginID})
            .then((response) => {
                if (response.data){
                    //update components of user information
                    setUserFirstName(response.data[0].firstname);
                    setUserLastName(response.data[0].lastname);
                    setUserEmail(response.data[0].email);
                    setUserBalance(response.data[0].balance);
                    setUser2FA(response.data[0]["2FA"]);
                    setUserType(response.data[0].type);
                    UpdateCredit(response.data[0].balance)
                }
            })
        }

        if (loginStatus){
            console.log(loginID)
            GetInformation()
            get_payee()
        }else{
            navigate("/login")
        }
    })

    //Some components in page need to be reset back to default

    //switching pages to billing by component state change
    const switch_billing = () =>{
        set_profile_button("billing")
        get_history()
        get_sub()
    }
    //switching pages to payee by component state change
    const switch_payee = () =>{
        set_profile_button("payee")
        setPayeeAdd(false)
        setPayeeAdd_ID("")
        setPayeeAdd_Name("")
        setPayeeAdd_Msg("")
    }
    //render payee page by component state change
    const switch_payee_add = () => {
        setPayeeAdd(!payeeAdd)
        setPayeeAdd_Msg("")
    }
    //switching pages to security by component state change
    const switch_security = () =>{
        set_profile_button("security")
        setUserCurrentPassword("")
        setUserOldPassword("")
        setUserNewPassword("")
        setUserConfirmNewPassword("")
        setResetPasswordMsg("")
        setcheckPasswordFailMsg("")
    }
    //switching pages to dangerzone by component state change
    const switch_dangerzone = () =>{
        set_profile_button("dangerzone")
        setUserTerminatePassword("")
        setUserTerminateConfirm("")
        setUserTerminateMsg("")
    }

    //Functions
    //update credit by calculation in backend site, take balance as parameter
    const UpdateCredit = async (balance) =>{
        //check the total debt of user
        await Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_debt",{
        searchingID: loginID})
        .then((response) => {
            //If user has any debt
            if (response.data[0]){
                setUserDebt(response.data.reduce((prev, cur) => prev + cur.total, 0));
                //with balance and total debt, send them to backend to perform credit calculation
                Axios.post("https://piggbank-backend-api.herokuapp.com/account/credit_scoring", {
                balance: balance,
                debt: response.data[0].total})
                .then((credit) => {
                    //update credit in component
                    setUserCredit(credit.data)
                    //update credit in database
                    Axios.post("https://piggbank-backend-api.herokuapp.com/account/update_credit", {
                    searchingID: loginID, credit: credit.data})
                })
            }else{
                //If user has no debt, the debt input will be 0
                //Send them to backend calculation
                Axios.post("https://piggbank-backend-api.herokuapp.com/account/credit_scoring", {
                balance: balance,
                debt: 0})
                .then((credit) => {
                    //update credit in component
                    setUserCredit(credit.data)
                    //update credit in database
                    Axios.post("https://piggbank-backend-api.herokuapp.com/account/update_credit", {
                    searchingID: loginID, credit: credit.data})
                })
            }
        })
    }

    //get all history information by user ID
    const get_history = async () => {
        await Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_history",{
        searchingID: loginID})
        .then((history) => {
            if (history.data.length){
                //update component to store all history sent from backend
                setUserHistory(history.data)
            }
        })
    }

    //get all subscription by user ID
    const get_sub = async () => {
        await Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_sub",{
        searchingID: loginID})
        .then((subscription) => {
            if (subscription.data.length){
                setUserSub(subscription.data)
            }
        })
    }

    //get all payee information by user ID
    const get_payee = () => {
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/get_payee",{
        searchingID: loginID})
        .then((response) => {
            if (response.data){
                //update component to store all payee sent from backend
                setUserPayee(response.data)
            }
        })
        //reset component for page render
        setPayeeAdd_ID("")
        setPayeeAdd_Name("")
    }

    //Add payee by another user ID, checking input before sending the request into backend
    const add_payee = async() => {
        //check if the input make sense before sending into backend
        if (payeeAdd_ID === ""){
            return setPayeeAdd_Msg("Payee ID can not be empty.")
        }
        if (payeeAdd_ID === loginID){
            return setPayeeAdd_Msg("You can not register yourself as payee.")
        }
        if (payeeAdd_Name.length > 20){
            return setPayeeAdd_Msg("Payee Name is too long!")
        }
        //check if payee is already registered for user
        await Axios.post("https://piggbank-backend-api.herokuapp.com/profile/check_payee",{
            user_id_checkpayee: loginID,
            check_payee_id: payeeAdd_ID
        }).then((checkresult) =>{
            //If yes, update component to display the error message
            if(checkresult.data.length){
                setPayeeAdd_Msg("Payee already registered on your list.")
            }else{
                //If no, check if the payee (userID) really exist
                Axios.post("https://piggbank-backend-api.herokuapp.com/profile/check_user",{
                payee_id_checkuser: payeeAdd_ID
                }).then((checkuser_result) =>{
                    if(checkuser_result.data !== ''){
                        //If yes, add it into the user information
                        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/add_payee",{
                            user_id_addpayee: loginID,
                            add_payee_id: payeeAdd_ID,
                            add_payee_name: payeeAdd_Name
                        })
                        //turn the payee_add Boolean into False, in order to close the form
                        switch_payee_add()
                    }else{
                        setPayeeAdd_Msg("Payee ID does not exist.")
                    }
                    //call the function of getting payee information for rendering the Profile page
                    get_payee()
                })
            }
        })
    }

    //delete payee
    const delete_payee = (payeeID) => {
        var payee_ID = payeeID
        //perform DELETE in database row
        Axios.post("https://piggbank-backend-api.herokuapp.com/profile/delete_payee", {
            user_id_deletepayee: loginID,
            payee_id: payee_ID})
        .then(() => {
            //reload the components in order to render the page without refresh
            get_payee()
        })
    }

    //enable the 2FA status in user information
    const enable2FA = () => {
        //check if the password correct, before sending the request into backend
        Axios.post("https://piggbank-backend-api.herokuapp.com/account/check_password",{
            user_id_checkpassword: loginID,
            input_password: userCurrentPassword})
        .then((response_enable2FA) => {
            //If yes, the backend should response as "Check Password Passed"
            if (response_enable2FA.data === "Check Password Passed"){
                //update database status of 2FA
                Axios.post("https://piggbank-backend-api.herokuapp.com/profile/enable_2FA",{user_id_enable2FA: loginID})
                .then(setUser2FA(!user2FA)) //update component state for page rendering (display 2FA is enabled)
                setcheckPasswordFailMsg("")
            //If no, update component status for displaying error message
            }else{
                setcheckPasswordFailMsg("Password Incorrect, please try it again")
            }
        })
    }

    //disable the 2FA in user information
    const disable2FA = () =>{
        //check if the password correct, before sending the request into backend
        Axios.post("https://piggbank-backend-api.herokuapp.com/account/check_password",{
            user_id_checkpassword: loginID,
            input_password: userCurrentPassword})
        .then((response_disable2FA) => {
            //If yes
            if (response_disable2FA.data === "Check Password Passed"){
                //update database status of 2FA
                Axios.post("https://piggbank-backend-api.herokuapp.com/profile/disable_2FA",{user_id_disable2FA: loginID})
                .then(setUser2FA(!user2FA))
                //reset the error message
                setcheckPasswordFailMsg("")
            //If no, update component to display error message
            }else{
                setcheckPasswordFailMsg("Password Incorrect, please try it again")
            }
        })
    }

    //changing password in user information
    const resetpassword = () =>{
        //check input if valid
        if (userNewPassword !== userConfirmNewPassword){
            return setResetPasswordMsg("Password and confirm password does not match.")
        }
        if (userNewPassword.length < 8){
            return setResetPasswordMsg("New Password should contain at least 8characters long.")
        }
        //check if the password correct, before sending the request into backend
        Axios.post("https://piggbank-backend-api.herokuapp.com/account/check_password",{
            user_id_checkpassword: loginID,
            input_password: userOldPassword})
            .then((response_resetpassword) => {
                //If yes
                if (response_resetpassword.data === "Check Password Passed"){
                    //update password
                    Axios.post("https://piggbank-backend-api.herokuapp.com/account/change_password",{
                        newpassword: userNewPassword,
                        targetEmail: userEmail
                    }).then(() => {
                        //show alert to user
                        window.alert("Password changed successful")
                        window.location.href = '/profile';
                    })
                }else{
                    //If no, update component to display error message
                    return setResetPasswordMsg("Incorrect Old Passowrd.")
                }
            })
    }

    //terminate account
    const delete_account = () =>{
        //check if the password correct, before sending the request into backend
        Axios.post("https://piggbank-backend-api.herokuapp.com/account/check_password",{
            user_id_checkpassword: loginID,
            input_password: userTerminatePassword
        }).then((response_deleteaccount) => {
            if (response_deleteaccount.data === "Check Password Passed"){
                //check confirmation input
                //If incorrect, update component to display error message
                if (userTerminateConfirm !== "terminate my account"){
                    return setUserTerminateMsg('Incorrect verification by input "terminate my account".')
                }else{
                    //terminate account by delete row in database
                    Axios.post("https://piggbank-backend-api.herokuapp.com/account/delete_account",{user_id_deleteaccount:loginID})
                    //alert user
                    window.alert("Account Terminated.\nAny problem, please contact: rudyyen.work@gmail.com")
                    //destory cookie
                    logout()
                }
            }else{
                return setUserTerminateMsg('Incorrect Current Password.')
            }
        })
    }

    //logout by destory cookie
    const logout = () => {
        setLoginStatus(false)
        setLoginID(0)
        Axios.get("https://piggbank-backend-api.herokuapp.com/account/logout")
        .then((err) => {
              console.log(err)
        })
        window.location.replace("/")
    }

    return (
        <div className="Profile">
            <div className="AccountContainer1">
                <div className="AccountContainerRow1">
                    <div className="ProfileTitle1">
                        <div className="far fa-user-circle"></div> Name
                        <div className="profile_name">{userFirstName} {userLastName}</div>
                    </div>
                    <div className="ProfileTitle2">
                        <div className="fa-solid fa-tag"></div> PiggyBank ID
                        <div className="profile_piggybankid">{loginID}</div>
                    </div>
                    <div className="ProfileTitle3">
                        <div className="fas fa-dollar-sign"></div> Savings
                        <div className="profile_savings">HKD {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                </div>

                <div className="profile_Row2_Row3">
                    <div className="AccountContainerRow2">
                        <button className={profile_button === "information" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={() => set_profile_button("information")}>Information</button>
                        <button className={profile_button === "billing" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={switch_billing}>Billing</button>
                        <button className={profile_button === "balance" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={() => set_profile_button("balance")}>Balance</button>
                        <button className={profile_button === "payee" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={switch_payee}>Payee</button>
                        <button className={profile_button === "security" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={switch_security}>Security</button>
                        <button className={profile_button === "dangerzone" ? "profile_page_button_active" : "profile_page_button"} 
                        onClick={switch_dangerzone}>Danger Zone</button>
                    </div>
                    
                    <div className="AccountContainerRow3">

                        {profile_button === "information" &&
                        /*  This is the information page.
                            User information will be displayed by the components saved from useEffect functions.*/
                        <div className="profile_information">
                            <div className="profile_firstname">Firstname </div>
                            <div className="profile_userdata">{userFirstName}</div>
                            <div className="profile_lastname">Lastname </div>
                            <div className="profile_userdata">{userLastName}</div>
                            <div className="profile_email">Email </div>
                            <div className="profile_userdata">{userEmail}</div>
                            <div className="profile_id">PiggBank ID </div>
                            <div className="profile_userdata">{loginID}</div>
                            <div className="profile_type">Account Type </div>
                            <div className="profile_userdata">{userType}</div>
                        </div>}

                        {profile_button === "billing" &&
                        /*  This is the Billing page.
                            Subsription information (development status) and Transaction History will be displayed by the components.
                            Transaction History will be displayed by the conditional statement for checking if user have any.
                            Then using map method to show all of them as a list of objects.*/
                        <div className="profile_billing">
                            <div className="profile_billing_plan">
                                <div className="profile_billing_topic">Subscription</div>
                                {userSub.length ?
                                <div>
                                    <div className="profile_billing_Row">
                                        <div className="profile_plan_plan">Plan</div>
                                        <div className="profile_plan_type">Type</div>
                                        <div className="profile_plan_date">Date</div>
                                    </div>
                                    {userSub.map((data, key) => {
                                        return(
                                            <div className="profile_billing_Row" key={key}>
                                                <div className="profile_billing_data"> {data.plan} </div>
                                                <div className="profile_billing_data"> {data.type} </div>
                                                <div className="profile_billing_data"> {data.date.split(',')[0]} </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <div className="profile_no_history">
                                    <img loading="lazy" src={no_sub} width='128' alt=""/>
                                    <div>You don't have any Subscription yet.</div>
                                    <a href="/service#insurance">Browse Piggy Insurance</a>
                                </div>
                                }
                            </div>
                            <div className="profile_billing_history">
                                <div className="profile_billing_topic" onClick={() => navigate("/history") }>
                                    <div>Transaction History <i className="fa-solid fa-arrow-right-long"></i></div>
                                </div>
                                {userHistory.length ?
                                <div>
                                    <div className="profile_billing_Row">
                                        <div className="profile_plan_plan">Amount</div>
                                        <div className="profile_plan_type">Type</div>
                                        <div className="profile_plan_date">Date</div>
                                    </div>
                                    <div className="profile_billing_history_block">
                                    {userHistory.map((data, key) => {
                                        return(
                                            <div className="profile_billing_Row" key={key}>
                                                <div className="profile_billing_data">
                                                    HKD {(data.type === "Transfer" && data.fromwho === loginID) || data.type === "Pay Off" || data.type === "Subscription"
                                                    ?
                                                    ((-data.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                                                    : 
                                                    (data.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </div>
                                                <div className="profile_billing_data">{data.type}</div>
                                                <div className="profile_billing_data">{data.date.split(',')[0]}</div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                :
                                <div className="profile_no_history">
                                    <img loading="lazy" src={no_history} width='128' alt=""/>
                                    <div>You don't have any Transaction History.</div>
                                </div>
                                }
                            </div>
                        </div>}

                        {profile_button === "balance" &&
                        /*  This is the Balance page.
                            Debt information and Credit will be displayed by the functions and components.
                            "View Detail" will redirect user to Debt page for more detail.
                            Credit will be dispalyed according to the componenets which defined by backend calculation.*/
                        <div>
                            <div className="profile_information">
                                <div className="profile_balance">Balance </div>
                                <div className="profile_userdata">HKD {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                <div className="profile_debt">Debt </div>
                                <div className="profile_debt_block">
                                    <div className="profile_userdata">HKD {userDebt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                    <div className="profile_debtview" onClick={() => navigate('/debt')}>View Detail</div>
                                </div>
                                <div className="profile_credit">Credit Rating <i className="fas fa-info-circle" onClick={() => set_credit_button(!credit_button)}/></div>
                                <div className="profile_userdata">{userCredit}</div>
                            </div>
                        { credit_button ? 
                            (<div className="profile_credit_info">Credit Rating is the evaluation of user credit risk based on the user's balance and debt. See more detail on <a href="/feature" >Here</a>.</div>) 
                            : ""}
                        </div>
                        }

                        {profile_button === "payee" &&
                        /*  This is the Payee page.
                            Payee Registeration by map method and component render can be performed here
                            The change of component status will render what it display by the conditional statement*/
                        <div className="profile_payee_content" id="payee">
                            <div className="profile_payee_information">
                                <div className="profile_payee_id">Payee ID</div>
                                <div className="profile_payee_name">Payee Name</div>
                                <div className="profile_payee_edit" onClick={() => switch_payee_add()}>
                                    <div className="profile_payee_edittxt">Add </div><i className="fas fa-plus-square" />
                                </div>
                            </div>
                            {userPayee.map((data, key) => {
                                return(
                                    <div className="profile_payee_information" key={key}>
                                        <div className="profile_userdata">{data.payee_id}</div>
                                        <div className="profile_userdata">{data.payee_name}</div>
                                        <div className="profile_payee_editbutton" onClick={() => delete_payee(data.payee_id)}>
                                            <div className="profile_payee_edittxt">Remove </div>
                                            <i className="fas fa-times-circle"></i></div>
                                    </div>
                                )
                            })}
                            {payeeAdd ?
                            <div className="profile_payee_add">
                                <div className="payee_id_add"><input type="text" placeholder="Payee ID" onChange={(e) =>{
                                    setPayeeAdd_ID(e.target.value) 
                                }}/></div>
                                <div className="payee_name_add"><input type="text" placeholder="Payee Name(Optional)" onChange={(e) =>{
                                    setPayeeAdd_Name(e.target.value)
                                }}/></div>
                                <div className="payee_add_button">
                                    <div className="payee_confirm_button" onClick={() => add_payee()}>Confirm </div>
                                    <div className="payee_cancel_button" onClick={() => switch_payee_add()}>Cancel </div>
                                </div>
                                <div className="payee_add_msg">{payeeAdd_Msg}</div>
                            </div>
                            :""
                            }
                            {!payeeAdd && !userPayee.length ?
                            <div className="profile_no_payee">
                                <img src={no_payee} width='160' alt=""/>
                                <div>You don't have any payee yet.</div>
                                <div>Click <b onClick={() => switch_payee_add()}>Add</b><i className="fas fa-plus-square" onClick={() => switch_payee_add()}/> to register one.</div>
                            </div>
                            :""
                            }
                        </div>}

                        {profile_button === "security" &&
                        /*  This is the Security page.
                            User can toggle the status of Two Factor Authenication (Enable/Disable).
                            Also, user can change their password here.
                            The change of component status will render what it display by the conditional statement.
                            */
                        <div className="profile_security">
                            <div className="profile_2FA">Two Factor Authenication</div>
                            <div className="profile_2FA_txt">Two-factor authentication (2FA) is a security control by additional verifcation. See more detail on <a href="feature">Here</a>.</div>
                            { !user2FA ? 
                            (<div>
                                <div className="profile_no2FA">Two-factor authentication is not enabled yet.</div>
                                <div className="profile_2FA_txt">To enable 2FA, please verify with your current password.</div>
                                <input type="password" placeholder="Current Password" onChange={(e) => {
                                setUserCurrentPassword(e.target.value);
                                }} className="profile_2FApassword"/>
                                <div className="profile_checkPasswordFail">{ checkPasswordFailMsg ? checkPasswordFailMsg : ""}</div>
                                <div><button className="profile_resetpassword_button" onClick={enable2FA}> Enable Two Factor Authenication </button></div>
                            </div>) : 
                            (<div>
                                <div className="profile_2FA_enabled">Two-factor authentication is enabled.</div>
                                <div className="profile_2FA_txt">To disable 2FA, please verify with your current password.</div>
                                <input type="password" placeholder="Current Password" onChange={(e) => {
                                setUserCurrentPassword(e.target.value);
                                }} className="profile_2FApassword"/>
                                <div className="profile_checkPasswordFail">{ checkPasswordFailMsg ? checkPasswordFailMsg : ""}</div>
                                <div><button className="profile_disable2FA_button" onClick={disable2FA}> Disable Two Factor Authenication </button></div>
                            </div>)}
                            <div className="profile_changepassword">Change Password</div>
                            <div className="profile_resetpassword">
                                <input type="password" placeholder="Old Password" onChange={(e) => {
                                    setUserOldPassword(e.target.value);
                                }} className="profile_oldpassword"/>
                                <input type="password" placeholder="New Password" onChange={(e) => {
                                    setUserNewPassword(e.target.value);
                                }} className="profile_newpassword"/>
                                <input type="password" placeholder="Confirm New Password" onChange={(e) => {
                                    setUserConfirmNewPassword(e.target.value);
                                }} className="profile_confirmnewpassword"/>
                                <div className="profile_checkPasswordFail">{ResetPasswordMsg}</div>
                                <div>
                                    <button className="profile_resetpassword_button" onClick={resetpassword}> Update Password </button>
                                </div>
                            </div>
                        </div>}

                        {profile_button === "dangerzone" &&
                        /*  This is the Dangerzone page.
                            User can terminate their account here.
                            */
                        <div className="profile_dangerzone_information">
                            <div className="profile_terminate">Terminate Account</div>
                            <div className="profile_warning">WARNING: Please be noticed that all your information will be deleted once you terminate your account.</div>
                            <div className="profile_verify_terminate1">To terminate your account, please enter your current password.</div>
                            <div className="profile_terminate_form">
                                <input type="password" placeholder="Current Password" onChange={(e) => {
                                        setUserTerminatePassword(e.target.value);
                                    }} className="profile_oldpassword"/>
                                <div className="profile_verify_terminate">To verify, please type "terminate my account" below</div>
                                <input type="text" onChange={(e) => {
                                        setUserTerminateConfirm(e.target.value);
                                    }} className="profile_oldpassword"/>
                            </div>
                            <div className="profile_checkPasswordFail">{userTerminateMsg}</div>
                            <button className="profile_terminate_button" onClick={delete_account}> Terminate your account </button>
                        </div>}
                        
                    </div>
                </div>

                <div className="AccountContainerRow4">
                    <div className="account_operation_title">Account Operation</div>
                    <div className="account_operation_container">
                        <div className="account_operation_block" onClick={() => navigate("/transfer")}>
                            <div className="account_operation_Img">
                                <img src={transfer_icon} width='96' alt=""/>
                            </div>
                            Transfer
                        </div>
                        <div className="account_operation_block" onClick={() => navigate("/withdrawal")}>
                            <div className="account_operation_Img">
                                <img src={withdrawal_icon} width='96' alt=""/>
                            </div>
                            Withdrawal
                        </div>
                        <div className="account_operation_block" onClick={() => navigate("/deposit")}>
                            <div className="account_operation_Img">
                                <img src={deposit_icon} width='96' alt=""/>
                            </div>
                            Deposit
                        </div>
                        <div className="account_operation_block" onClick={logout}>
                            <div className="account_operation_Img">
                                <img src={logout_icon} width='96' alt=""/>
                            </div>
                            Logout
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile;