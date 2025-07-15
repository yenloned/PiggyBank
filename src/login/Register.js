import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import './register.css';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

import user from "../material/icons/user.png"
import corporate from "../material/icons/corporate.png"
import group from "../material/icons/group.png"


const Register = () => {

    const navigate = useNavigate()

    const [accountChoice, setAccountChoice] = useState("")

    const [emailReg, setEmailReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('')
    const [firstnameReg, setfirstnameReg] = useState('')
    const [lastnameReg, setlastnameReg] = useState('')

    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [userInfoMsg, setuserInfoMsg] = useState('')
    const [mask, setMask] = useState(true);
    const [mask2, setMask2] = useState(true);

    //regular experssion
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const infoRegex = /^[a-zA-Z0-9 ]+$/

    //icon toggle for masking/showing the password
    const PasswordToggle = () => {setMask(!mask)}
    const ConfirmPasswordToggle = () => {setMask2(!mask2)}


    //check if password meet requirements by regular experssion
    const checkReg = async () => {
        setPasswordMsg("")
        setEmailMsg("")
        setuserInfoMsg("")
        setConfirmPasswordMsg("")

        //check if the account(Email) is already registered
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.REGISTERED}`,{
            cemail: emailReg
        }).then((response) =>{
            //If yes, update component to display error message
            if(response.data[0]){
                return setEmailMsg("Email Address already existed.")
            }
        })

        //password requirement by conditional statement
        if (Confirmpassword !== passwordReg){
            return setConfirmPasswordMsg("Password and confirm password does not match.")}
        if(!passwordReg){
            return setPasswordMsg("Password is required.")}
        if (!emailReg){
            return setEmailMsg("Email Adress is required.")}
        if (!firstnameReg || !lastnameReg){
            return setuserInfoMsg("User Information is required.")
        }else{
        if(passwordReg.length < 8){
            return setPasswordMsg("Password should be at least 8characters long.")}
        if(!emailRegex.test(emailReg)){
            return setEmailMsg("Email Address is invalid.")}
        if(!infoRegex.test(firstnameReg) || !infoRegex.test(lastnameReg)){
            return setuserInfoMsg("User Information should not contain any special characters except space.")}
        else if(firstnameReg.length > 30 || lastnameReg.length > 20){
            return setuserInfoMsg("User Information is too long.")}

            //If everything ok, perform the register function
            register_post()
    
        }
    }

    //acount register
    const register_post = () => {
        //input the user information to register account
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
            email: emailReg, 
            password: passwordReg,
            firstname: firstnameReg,
            lastname: lastnameReg,
        }).then((response) => {
            // Check if registration was successful based on new response format
            if (response.data && response.data.success === true) {
                //redirect to Login page if success
                navigate('/login')
            } else {
                // Handle error case
                console.error('Registration failed:', response.data)
                setEmailMsg("Registration failed. Please try again.")
            }
        }).catch((error) => {
            console.error('Registration error:', error)
            setEmailMsg("Registration failed. Please try again.")
        })
    }

    return (
        <div className="register">
            {accountChoice == "" &&
            <div className="account_choice_container">
                <div className="account_choice" onClick={() => setAccountChoice("personal")}>
                    <div className="account_choice_icon">
                        <img src={user} width='120' alt=""/>
                    </div>
                    <div className="account_choice_title">
                        Personal Account
                    </div>
                </div>
                <div className="account_choice">
                    <div className="account_choice_icon">
                        <img src={group} width='120' alt=""/>
                    </div>
                    <div className="account_choice_title">
                        Joint Account
                    </div>
                    <div className="account_choice_txt">
                        Coming Soon
                    </div>
                </div>
                <div className="account_choice">
                    <div className="account_choice_icon">
                        <img src={corporate} width='120' alt=""/>
                    </div>
                    <div className="account_choice_title">
                        Corporate Account
                    </div>
                    <div className="account_choice_txt">
                        Coming Soon
                    </div>
                </div>
            </div>
            }

            {accountChoice == "personal" &&
            <div className="regContainer">
                <div className="register_goback"><a className="fas fa-arrow-alt-circle-left" href="/register"></a></div>
                <div className="logintitle">Registeration</div>
                    <h5>User Information</h5>
                <div className="regname">
                    <div className="firstname">
                        <input type="text" placeholder="Firstname" onChange={(e) => {
                            setfirstnameReg(e.target.value);
                        }} className="firstnameType"/>
                        </div>
                        <div className="lasttname">
                        <input type="text" placeholder="Lastname" onChange={(e) => {
                            setlastnameReg(e.target.value);
                        }} className="lastnameType"/>
                    </div>
                    <div className="msg">{userInfoMsg ? userInfoMsg : ""}</div>
                </div>
                    <h5>Account Information</h5>
                <div className="regac">
                    <div className="email">
                        <input type="email" placeholder="Email Address" onChange={(e) => {
                            setEmailReg(e.target.value);
                        }} className="emailType"/>
                    </div>
                    <div className="msg">{emailMsg ? emailMsg : ""}</div>

                    <div className="password">
                        <input type={mask ? "password" : "text"} placeholder="Passsword" onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }} className="passwordType"/>
                        <span className={mask ? "far fa-eye" : "far fa-eye-slash"} onClick={PasswordToggle}/>
                    </div>
                    <div className="msg">{passwordMsg ? passwordMsg : ""}</div>

                    <div className="password">
                        <input type={mask2 ? "password" : "text"} placeholder="Confirm Passsword" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} className="repasswordType"/>
                        <span className={mask2 ? "far fa-eye" : "far fa-eye-slash"} onClick={ConfirmPasswordToggle}/>
                    </div>
                    <div className="msg">{confirmPasswordMsg ? confirmPasswordMsg : ""}</div>

                </div>
                <div>
                    <button className="regbutton" onClick={checkReg}> Register </button>
                </div>
                <div>
                    <a className="go-login" href="/login">Already have an account?</a>
                </div>
            </div>
            }
        </div>
    )
}

export default Register;