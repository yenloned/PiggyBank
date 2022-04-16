import React, { useState, useContext, useLayoutEffect} from "react";
import { LoginStatusContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

import postbox_2FA from "../material/pictures/postbox_2FA.png"
import login from "../material/pictures/login.png"

import Axios from 'axios';
import './login.css';



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

    const login_post = () => {
        Axios.post('http://localhost:3005/account/login', {
            email: email, 
            password: password,

        }).then((response) => {

            if (response.data.auth) {
                setLoginStatus(true)
                localStorage.setItem("token", response.data.token)
            }else{
                setLoginDisplay("Email Address / Password does not exist")
                setLoginStatus(false)
            }
        })
    }

    const userAuth = () => {
        Axios.get("http://localhost:3005/account/auth", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        }).then((response) => {
            console.log (response.data);
        })
    }

    const login_check_2FA_status = () => {
        Axios.post("http://localhost:3005/account/check_2FA", {
            user_email: email
        }).then((result) =>{
            if (result.data){
                setLoginAuth(true)
                Axios.post('http://localhost:3005/account/store_code', {
                    storeEmail: email
                }).then (() => {
                    Axios.post("http://localhost:3005/email/reset_email", {
                        targetemail: email,
                    })
                })
            }else{
                login_post()
            }
        })
    }

    const login_check_2FA = () => {
        Axios.post("http://localhost:3005/account/check_code", {
            code: code,
            user_email: email
        }).then((response) => {
            if(response.data){
                login_post()
            }else{
                setLogin2FAMsg("Incorrect verification code, please try again.")
            }
        })
    }

    const [mask, setMask] = useState(true)

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
                <button className="loginbutton" onClick={login_check_2FA_status}> Login </button>
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