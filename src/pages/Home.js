import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";

import AOS from 'aos';
import 'aos/dist/aos.css';

import './home.css'
import './respondMedia.css'
import goldpiggy from '../material/pictures/goldpiggy.jpg';
import alwayshere from '../material/pictures/alwayshere.png';
import lesscomplex from '../material/pictures/lesscomplex.png';
import wecare from '../material/pictures/wecare.png';
import tohelp from '../material/pictures/tohelp.png';
import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

import Footer from '../comps/Footer';

const Home = () => {


    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");

    useEffect( () => {
        AOS.init({duration: 800})
        //get user information
        async function GetInformation(){
        await Axios.post(`${API_BASE_URL}${API_ENDPOINTS.GET_INFO}`,{
        searchingID: loginID})
        .then((response) => {
            if (response.data){
                //save them into components
                setUserFirstName(response.data[0].firstname);
                setUserLastName(response.data[0].lastname);
                }
            })
        }
        if (loginStatus){
            //get the information by calling the function
            GetInformation()
        }
    })

    return (
        <div className="home">
            <div className="pig">
                <div className="homeheader">
                    <div data-aos="slide-left" className="headerimg">
                        <img src={goldpiggy} width='700' alt="goldpiggy"/>
                        <br/>
                    </div>
                    <div className="headertitle">
                        PIGGYBANK
                        <div className="headertxt">
                            <div className="headerline1">
                                <i className="fas fa-coins"></i>Transaction and Withdrawal
                            </div>
                            <div className="headerline2">
                                <i className="fas fa-calculator"></i>Credit Scoring and Risk Calculation
                            </div>
                            <div className="headerline3">
                                <i className="fas fa-user"></i>Easy Account Management
                            </div>
                            <div className="headerline4">
                                <i className="fas fa-comment-dollar"></i>Loan and Insurance
                            </div>
                            <div className="headerline5">
                                <i className="fas fa-mobile-alt"></i> Mobile Friendly
                            </div>
                        </div>
                        <div data-aos="fade-down" data-aos-duration="1200">
                            {loginStatus ? (
                            <a className="homeWelcome" href="profile">
                                Welcome Back! {userFirstName} {userLastName}
                            </a>
                            ) :(
                            <a className="startbutton" href="/login">
                                Get Started
                            </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeContainer">
                <div className="homeDisplayBlock">
                    <div data-aos="slide-right" data-aos-once="true" className="homeLeftGrid">
                        <img src={alwayshere} alt="alwayshere"/>
                    </div>
                    <div data-aos="slide-left" data-aos-once="true" className="homeLeftGridTxt">
                        <div className="homeLeftGridHeader">
                            PiggyBank is always here
                        </div>
                        <div className="homeLeftGridBody">
                            Unlike traditional banks, you can browse PiggyBank anytime you want. As PiggyBank is hosted online and running 24x7, the limitation brought by time and geography is broken. 
                            You can use our bank services anytime and anywhere you want. View more about <a href="/service">What PiggyBank provides</a> here.
                        </div>
                    </div>
                    <div data-aos="slide-right" data-aos-once="true" className="homeRightGridTxt">
                        <div className="homeRightGridHeader">
                            More features, Less complex
                        </div>
                        <div className="homeRightGridBody">
                            PiggyBank is the generation of creativity and innovation. We provide various helpful and special features, which improve the user experience and comprehensive function in different aspects. 
                            You can view more details of <a href="/feature">Feature</a> here.
                        </div>
                    </div>
                    <div data-aos="slide-left" data-aos-once="true" className="homeRightGrid">
                        <img src={lesscomplex} alt="lesscomplex"/>
                    </div>
                    <div data-aos="slide-right" data-aos-once="true" className="homeLeftGrid">
                        <img src={wecare} alt="wecare"/>
                    </div>
                    <div data-aos="slide-left" data-aos-once="true" className="homeLeftGridTxt">
                        <div className="homeLeftGridHeader">
                            PiggyBank cares about you
                        </div>
                        <div className="homeLeftGridBody">
                            At PiggyBank, we care about what you care about, especially your data security and privacy protection. 
                            Therefore, we developed a series of <a href="/feature#security">Security Controls</a> and <a href="/privacy">Privacy policies</a>, in order to provide the best and most reliable services. 
                            Feel free to check out more <a href="/about">About PiggyBank</a> here.
                        </div>
                    </div>
                    <div data-aos="slide-right" data-aos-once="true" className="homeRightGridTxt">
                        <div className="homeRightGridHeader">
                            Less confusion, More friendly
                        </div>
                        <div className="homeRightGridBody">
                            To offer the best user experience, PiggyBank makes sure you have no difficulties and confusion during usage. 
                            You can visit our <a href="/support=general">FAQ Page</a> for a handy solution to any obstacles. We would wish you have an enjoyable experience here.
                        </div>
                    </div>
                    <div data-aos="slide-left" data-aos-once="true" className="homeRightGrid">
                        <img src={tohelp} alt="tohelp"/>
                    </div>
                </div>
            </div>
            <div data-aos="fade-down" data-aos-once="true" className="homeContainer1">
                <a href="/service#operation">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fa-solid fa-money-bill-transfer"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Transaction
                            </div>
                            Instant Transaction without handling fee.
                            <div className="homeDisplayQuote">
                                -- Time to pay back your friend for that dinner.
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/service#operation">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fa-solid fa-sack-dollar"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Withdrawal
                            </div>
                            Easy steps to take out money from PiggyBank.
                            <div className="homeDisplayQuote">
                                -- Cash is King!
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/service#operation">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fas fa-donate"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Deposit
                            </div>
                            Easy steps to save money into PiggyBank.
                            <div className="homeDisplayQuote">
                                -- That's why we called "PiggyBank", right?
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/service#loan">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fas fa-hand-holding-usd"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Loans
                            </div>
                            PiggyBank Loan is offered with a low rate of APR.
                            <div className="homeDisplayQuote">
                                -- For students, entrepreneurs, and gamblers.
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/service#insurance">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fas fa-handshake"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Insurance
                            </div>
                            PiggyBank is here to protect you and your family.
                            <div className="homeDisplayQuote">
                                -- That's what people buy before extreme sports.
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/feature#payee">
                    <div className="homeDisplayBlock1">
                        <div className="homeDisplayImg"><i className="fa-solid fa-user-group"></i></div>
                        <div className="homeDisplayTxt">
                            <div className="homeDisplayHeader">
                                Payee
                            </div>
                                High Efficiency and Convenience in Transaction.
                            <div className="homeDisplayQuote">
                                -- You do that when you don't remember their number.
                            </div>
                            <div className="homeDisplayLearnMore">
                                Learn more <i className="fas fa-angle-double-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            
            <Footer />

        </div>
    )
}

export default Home;