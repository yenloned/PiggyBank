import React, { useState, useContext, useLayoutEffect} from "react";
import { LoginStatusContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

import postbox_2FA from "../material/pictures/postbox_2FA.png"
import login from "../material/pictures/login.png"

import Axios from 'axios';
import './login.css';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';



export default function Login(){

    const navigate = useNavigate()
    Axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState("")

    const {loginStatus, setLoginStatus} = useContext(LoginStatusContext);
    const [loginDisplay, setLoginDisplay] = useState("");
    const [loginAuth, setLoginAuth] = useState(false);
    const [login2FAMsg, setLogin2FAMsg] = useState("")

    useLayoutEffect(() => {
        if (loginStatus){
            navigate('/profile')
            window.location.reload()
        }
    })

    //login
    const login_post = () => {
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            email: email, 
            password: password,
        //the login prcoess in real case will be creating cookie and session, which will be performed in backend
        }).then((response) => {
            //If login success
            if (response.data.auth) {
                //change share component status
                setLoginStatus(true)
                //jwt token store in localStorage
                localStorage.setItem("token", response.data.token)
            //If login fail, display error message by component render
            }else{
                setLoginDisplay("Email Address / Password does not exist")
                setLoginStatus(false)
            }
        })
    }

    //check if the user has enabled 2FA
    const login_check_2FA_status = () => {
        //SELECT the 2FA status from database by user ID
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.CHECK_2FA}`, {
            user_email: email
        }).then((result) =>{
            //If the 2FA status is True, which means it is enabled
            if (result.data && result.data.enabled === true){
                //change the useState component in order to render the page (code Verification)
                setLoginAuth(true)
                //generate random code in backend and store it in database
                Axios.post(`${API_BASE_URL}${API_ENDPOINTS.STORE_CODE}`, {
                    storeEmail: email
                }).then (() => {
                    //SELECT the verification code and send it to Email (registered one)
                    Axios.post(`${API_BASE_URL}${API_ENDPOINTS.RESET_EMAIL}`, {
                        targetemail: email,
                    })
                })
            //If it is not enabled, just perform login process
            }else{
                login_post()
            }
        })
    }

    //check if the user input match the verification code stored in database
    const login_check_2FA = () => {
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.CHECK_CODE}`, {
            code: code,
            user_email: email
        }).then((response) => {
            //If success, the SELECT result will have length > 0, which means True in Boolean
            if(response.data){
                //perform login process
                login_post()
            //If fail, update component status to dispaly the error message
            }else{
                setLogin2FAMsg("Incorrect verification code, please try again.")
            }
        })
    }

    //check if the account existed or not first, then pass to check 2FA
    const login_check_exist = () => {
        Axios.post(`${API_BASE_URL}${API_ENDPOINTS.REGISTERED}`, {
            cemail: email
        }).then((response) =>{
            if(response.data.length){
                login_check_2FA_status()
            }else{
                setLoginDisplay("Email Address / Password does not exist")
                setLoginStatus(false)
            }
        })
    }

    //component for toggle the masking / showing of password text
    const [mask, setMask] = useState(true)

    //the toggle function, called when user click the eye icon
    const PasswordToggle = () => {
        setMask(!mask)
    }
    
    return (
        <div className="login">
        {loginAuth ? (
            <div className="loginContainer">
                <div className="logintitle">Verification</div>
                <img src={postbox_2FA} alt="" width='150px' />
                <div className="verification">
                    Since this account is protected by Two Factor Authenication, verification code has been sent to <verification_highlight>{email}</verification_highlight>
                    <div className="verification_block">
                        <input type="text" placeholder="Verification Code" onChange={(e) => {
                            setCode(e.target.value);
                        }} className="codeType"/>
                        <button className="regbutton" onClick={login_check_2FA}> Submit </button>
                        <div className="msg">{login2FAMsg}</div>
                    </div>
                </div>
            </div>
            ) 
            : 
            (
            <div className="loginContainer">
                <div className="logintitle">Login</div>
                <img src={login} alt="" width='150px' />
                    <div className="email">
                        <input type="text" placeholder="Email Address" onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="emailType"/>
                    </div>
                    <div className="password">
                        <input type={mask ? "password" : "text"} placeholder="Passsword" onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="passwordType"/>
                        <span className={mask ? "far fa-eye" : "far fa-eye-slash"} onClick={PasswordToggle}/>
                    </div>
                    <div className="msg">{loginDisplay ? loginDisplay : ""}</div>
                <div>
                <button className="loginbutton" onClick={login_check_exist}> Login </button>
                </div>
                <div>
                    <a className="go-register" href="/register">Don't have an account?</a>
                    <a className="resetpassword" href="/resetpassword">Forgot Password</a>
                </div>
            </div>
            )
        }
        </div>
    )
}