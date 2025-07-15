import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import './loan.css';
import '../pages/service.css'
import Footer from '../comps/Footer';

import AOS from 'aos';
import 'aos/dist/aos.css';

import loan_personal from "../material/icons/loan_personal.png";
import loan_mortgage from "../material/icons/loan_mortgage.png";
import loan_creditcard from "../material/icons/loan_creditcard.png";
import missing_credit from "../material/pictures/missing_credit.png"

import {LoginStatusContext} from "../context/LoginContext";
import {LoginIDContext} from "../context/LoginContext";

const Loan = () => {

    Axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const {loginStatus} = useContext(LoginStatusContext);
    const {loginID} = useContext(LoginIDContext);

    const [loanChoice, setLoanChoice] = useState("")

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userCredit, setUserCredit] = useState("")
    const [userAge, setUserAge] = useState(18);
    const [userJob, setUserJob] = useState("");
    const [userNumber, setUserNumber] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [userIncome, setUserIncome] = useState(5000)
    const [userCreditRate, setUserCreditRate] = useState("--")

    const [personalMaxIndex, setPersonalMaxIndex] = useState(1)
    const [personalAmount, setPersonalAmount] = useState(10000)
    const [personalMaxAmount, setPersonalMaxAmount] = useState(1500000)
    const [personalTenor, setPersonalTenor] = useState(3)
    const [personalMaxTenor, setPersonalMaxTenor] = useState(60)

    const [mortgageAmount, setMortgageAmount] = useState(10000)
    const [mortgageTenor, setMortgageTenor] = useState(3)

    const [cardAmount, setCardAmount] = useState(10000)
    const [cardTenor, setCardTenor] = useState(3)

    const [loanErrorMsg, setLoanErrorMsg] = useState("")

    useEffect(() => {
        AOS.init({duration: 800})
        //personal
        if (personalAmount < 10000){
            setPersonalAmount(10000)
        }else if (personalAmount > (personalMaxAmount*personalMaxIndex)){
            setPersonalAmount(personalMaxAmount*personalMaxIndex)
        }
        if (personalTenor < 3){
            setPersonalTenor(3)
        }else if (personalTenor > personalMaxTenor || personalTenor > 60){
            setPersonalTenor(setPersonalMaxTenor)
        }

        //mortgage
        if (mortgageAmount < 10000){
            setMortgageAmount(10000)
        }else if (mortgageAmount > 1500000){
            setMortgageAmount(1500000)
        }
        if (mortgageTenor < 3){
            setMortgageTenor(3)
        }else if (mortgageTenor > 60){
            setMortgageTenor(60)
        }

        //credit card
        if (cardAmount < 10000){
            setCardAmount(10000)
        }else if (cardAmount > 1500000){
            setCardAmount(1500000)
        }
        if (cardTenor < 3){
            setCardTenor(3)
        }else if (cardTenor > 60){
            setCardTenor(60)
        }

        //info
        if (userAge < 18){
            setUserAge(18)
        }else if (userAge > 100){
            setUserAge(100)
        }
        if (userIncome < 5000){
            setUserIncome(5000)
        }else if (userIncome > 500000){
            setUserIncome(500000)
        }
        if (!userFirstName && !userLastName && !userCredit){
            Axios.post(`${API_BASE_URL}${API_ENDPOINTS.GET_INFO}`,{
            searchingID: loginID})
            .then((response) => {
                if (response.data){
                    setUserFirstName(response.data[0].firstname)
                    setUserLastName(response.data[0].lastname)
                    setUserCredit(response.data[0].credit)

                    if (response.data[0].credit === "AAA" || response.data[0].credit === "AA"){
                        setUserCreditRate("Very Good")
                        setPersonalMaxIndex(1)
                        setPersonalMaxTenor(60)
                    }else if (response.data[0].credit === "A" || response.data[0].credit === "BBB"){
                        setUserCreditRate("Good")
                        setPersonalMaxIndex(0.75)
                        setPersonalMaxTenor(50)
                    }else if (response.data[0].credit === "BB" || response.data[0].credit === "B"){
                        setUserCreditRate("Average")
                        setPersonalMaxIndex(0.5)
                        setPersonalMaxTenor(40)
                    }else if (response.data[0].credit === "CCC" || response.data[0].credit === "CC"){
                        setUserCreditRate("Bad")
                        setPersonalMaxIndex(0.25)
                        setPersonalMaxTenor(30)
                    }else if (response.data[0].credit === "C" || response.data[0].credit === "D"){
                        setUserCreditRate("Very Bad")
                        setPersonalMaxIndex(0.05)
                        setPersonalMaxTenor(12)
                    }else{
                        setUserCreditRate("Null")
                    }
                }
            })
        }
    })

    useLayoutEffect(() => {
        if (!loginStatus && loginID) {
            navigate('/login')
        }
    })

    const applyLoan = (amount, tenor, repay) => {
        if (userFirstName.length && userLastName.length && userAddress.length  && userJob.length && userNumber.length && userPhone.length){
            Axios.post(`${API_BASE_URL}${API_ENDPOINTS.LOAN}`,{
            loan_userid: loginID,
            amount: amount,
            tenor: tenor,
            repay: repay
        })
        window.location.replace("/history")
        }else{
            return setLoanErrorMsg("Missing required information, please try again.")
        }
        
    }


    return (
        <div className="loan">
            {userCreditRate !== "Null" ?
            <div>
                <div className="loan_form">
                    <div className="loan_subtitle">Borrower's Information</div>
                    <div className="loan_userinfo">
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">First Name</div>
                            <div className="loan_info_data">
                                <input type="text" value={userFirstName} onChange={(e) => {setUserFirstName(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Last Name</div>
                            <div className="loan_info_data">
                                <input type="text" value={userLastName} onChange={(e) => {setUserLastName(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Age</div>
                            <div className="loan_info_data">
                                <input type="number" value={userAge} onChange={(e) => {setUserAge(e.target.value)}}/>
                            </div>
                            <div className="loan_info_quote">
                                ** Borrower must be at least 18 years old
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Residential Address</div>
                            <div className="loan_info_data">
                                <input type="text" onChange={(e) => {setUserAddress(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Identity Number</div>
                            <div className="loan_info_data">
                                <input type="text" onChange={(e) => {setUserNumber(e.target.value)}}/>
                            </div>
                            <div className="loan_info_quote">
                                e.g. A1234567(8)
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Phone Number</div>
                            <div className="loan_info_data">
                                <input type="number" onChange={(e) => {setUserPhone(e.target.value)}}/>
                            </div>
                            <div className="loan_info_quote">
                                e.g. 1234 5678
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Current Job</div>
                            <div className="loan_info_data">
                                <input type="text" value={userJob} onChange={(e) => {setUserJob(e.target.value)}}/>
                            </div>
                            <div className="loan_info_quote">
                                e.g. Student, Unemployed, Software Engineer
                            </div>
                        </div>
                        <div className="loan_userinfo_block">
                            <div className="loan_info_topic">Monthly Income (HKD)</div>
                            <div className="loan_info_data">
                                <input type="number" value={Math.floor(userIncome)} onChange={(e) => {setUserIncome(e.target.value)}}/>
                            </div>
                            <div className="loan_info_quote">
                                ** Borrower must have a monthly income of at least HKD5,000
                            </div>
                        </div>
                    </div>
                    <div className="loan_credit">
                        <div className="loan_info_topic">Estimated Credit</div>
                        <div className="loan_credit_rate">{userCreditRate}</div>
                        <div className="loan_info_quote">
                            ** It is a estimated credit score based on your current balance status, which will be used to determine the Loan Amount below.
                        </div>
                    </div>
                    <div className="loan_subtitle">Loan's Type</div>
                    <div className="loan_choice">
                        <div className={loanChoice === "Personal Instalment" ? "loan_choice_block_active" :"loan_choice_block"} onClick={() => setLoanChoice("Personal Instalment")}>
                            <img src={loan_personal} width="192px" />
                            Personal Instalment
                        </div>
                        <div className={loanChoice === "House Mortgage" ? "loan_choice_block_active" :"loan_choice_block"} onClick={() => setLoanChoice("House Mortgage")}>
                            <img src={loan_mortgage} width="192px" />
                            House Mortgage
                        </div>
                        <div className={loanChoice === "Credit Card" ? "loan_choice_block_active" :"loan_choice_block"} onClick={() => setLoanChoice("Credit Card")}>
                            <img src={loan_creditcard} width="192px" />
                            Credit Card
                        </div>
                    </div>
                    <div className="loan_typetitle">{loanChoice}</div>
                    {loanChoice === "" &&
                    <div className="loan_notyet_choose">
                        Select the Loan Type above in order to further process of the Loan Process
                    </div>
                    }
                    {loanChoice === "Personal Instalment" &&
                    <div className="loan_personal">
                        <div className="calculator_title2" data-aos="fade-in">Loan Amount (HKD)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="10000" max={personalMaxAmount} onChange={(e) => {setPersonalAmount(e.target.value);}} value={personalAmount} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            HKD 10,000
                            <input type="range" min="10000" max={personalMaxAmount*personalMaxIndex} value={personalAmount} step="10000"
                            onChange={(e) => {setPersonalAmount(e.target.value);}} className="calculator_slider_range"/>
                            HKD {(personalMaxAmount*personalMaxIndex).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="calculator_title2" data-aos="fade-in">Tenor (Month)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="3" max={personalMaxTenor} onChange={(e) => {setPersonalTenor(e.target.value);}} value={personalTenor} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            3 Months
                            <input type="range" min="3" max={personalMaxTenor} value={personalTenor} step="1"
                            onChange={(e) => {setPersonalTenor(e.target.value);}} className="calculator_slider_range"/>
                            {personalMaxTenor} Months
                        </div>
                        <div className="calculator_content">
                            <div className="calculator_title2" data-aos="fade-in">Monthly Repayment</div>
                            <div className="calculator_monthly_repayment" data-aos="fade-in">
                                HKD {Math.floor(personalAmount / 
                                (( ((1 + (3/1200))**personalTenor) - 1 ) / ( (3/1200) * ((1+(3/1200))**personalTenor))))
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                        </div>
                        <div className="loan_apply" data-aos="fade-in">
                            <button onClick={() => applyLoan(personalAmount, personalTenor, Math.floor(personalAmount / (( ((1 + (3/1200))**personalTenor) - 1 ) / ( (3/1200) * ((1+(3/1200))**personalTenor)))))}>Apply</button>
                        </div>
                        <div className="loan_msg">
                            {loanErrorMsg}
                        </div>
                        <div className="loan_statement" data-aos="fade-in">
                            ** Please note that this will not be actual lending as this is only a demo showcase of a loan function in this project. Therefore, user are not required to input any real data.<br/>
                            ** In the real case scenario, the loan process would require more borrower information and a series of background checking and document verification. For example, the address proof, paycheck, etc. 
                            In other words, the calculation and credit scoring in PiggyBank Loan will not be 100% accurate due to the adjustment of the borrower's information.
                        </div>
                    </div>
                    }

                    {loanChoice === "House Mortgage" &&
                    <div className="loan_personal">
                        <div className="calculator_title2" data-aos="fade-in">Property Address</div>
                            <div className="mortgage_address" data-aos="fade-in"><input type="text" /></div>
                        <div className="calculator_title2" data-aos="fade-in">Loan Amount (HKD)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="10000" max="1500000" onChange={(e) => {setMortgageAmount(e.target.value);}} value={mortgageAmount} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            HKD 10,000
                            <input type="range" min="10000" max="1500000" value={mortgageAmount} step="10000"
                            onChange={(e) => {setMortgageAmount(e.target.value);}} className="calculator_slider_range"/>
                            HKD 1,500,000
                        </div>
                        <div className="calculator_title2" data-aos="fade-in">Tenor (Month)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="3" max="60" onChange={(e) => {setMortgageTenor(e.target.value);}} value={mortgageTenor} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            3 Months
                            <input type="range" min="3" max="60" value={mortgageTenor} step="1"
                            onChange={(e) => {setMortgageTenor(e.target.value);}} className="calculator_slider_range"/>
                            60 Months
                        </div>
                        <div className="calculator_content">
                            <div className="calculator_title2" data-aos="fade-in">Monthly Repayment</div>
                            <div className="calculator_monthly_repayment" data-aos="fade-in">
                                HKD {Math.floor(mortgageAmount / 
                                (( ((1 + (1.67/1200))**mortgageTenor) - 1 ) / ( (1.67/1200) * ((1+(1.67/1200))**mortgageTenor))))
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                        </div>
                        <div className="loan_apply" data-aos="fade-in">
                        <button onClick={() => applyLoan(mortgageAmount, mortgageTenor, Math.floor(mortgageAmount / (( ((1 + (1.67/1200))**mortgageTenor) - 1 ) / ( (1.67/1200) * ((1+(1.67/1200))**mortgageTenor)))))}>Apply</button>
                        </div>
                        <div className="loan_msg">
                            {loanErrorMsg}
                        </div>
                        <div className="loan_statement" data-aos="fade-in">
                            ** Please note that this will not be actual lending as this is only a demo showcase of a loan function in this project. Therefore, user are not required to input any real data.<br/>
                            ** In the real case scenario, the loan process would require more borrower information and a series of background checking and document verification. For example, the address proof, paycheck, etc. 
                            In other words, the calculation and credit scoring in PiggyBank Loan will not be 100% accurate due to the adjustment of the borrower's information.
                        </div>
                    </div>
                    }

                    {loanChoice === "Credit Card" &&
                    <div className="loan_personal">
                        <div className="calculator_title2" data-aos="fade-in">Credit Card Number</div>
                            <div className="mortgage_address" data-aos="fade-in"><input type="text" /></div>
                        <div className="calculator_title2" data-aos="fade-in">Security Number</div>
                            <div className="credit_card_security" data-aos="fade-in"><input type="text" /></div>
                        <div className="calculator_title2" data-aos="fade-in">Loan Amount (HKD)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="10000" max="1500000" onChange={(e) => {setCardAmount(e.target.value);}} value={cardAmount} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            HKD 10,000
                            <input type="range" min="10000" max="1500000" value={cardAmount} step="10000"
                            onChange={(e) => {setCardAmount(e.target.value);}} className="calculator_slider_range"/>
                            HKD 1,500,000
                        </div>
                        <div className="calculator_title2" data-aos="fade-in">Tenor (Month)</div>
                        <div className="loan_range_result" data-aos="fade-in">
                            <input type="number" min="3" max="60" onChange={(e) => {setCardTenor(e.target.value);}} value={cardTenor} />
                        </div>
                        <div className="loan_range" data-aos="fade-in">
                            3 Months
                            <input type="range" min="3" max="60" value={cardTenor} step="1"
                            onChange={(e) => {setCardTenor(e.target.value);}} className="calculator_slider_range"/>
                            60 Months
                        </div>
                        <div className="calculator_content">
                            <div className="calculator_title2" data-aos="fade-in">Monthly Repayment</div>
                            <div className="calculator_monthly_repayment" data-aos="fade-in">
                                HKD {Math.floor(cardAmount / 
                                (( ((1 + (5/1200))**cardTenor) - 1 ) / ( (5/1200) * ((1+(5/1200))**cardTenor))))
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                        </div>
                        <div className="loan_apply" data-aos="fade-in">
                            <button onClick={() => applyLoan(cardAmount, cardTenor, Math.floor(cardAmount / (( ((1 + (5/1200))**cardTenor) - 1 ) / ( (5/1200) * ((1+(5/1200))**cardTenor)))))}>Apply</button>
                        </div>
                        <div className="loan_msg">
                            {loanErrorMsg}
                        </div>
                        <div className="loan_statement" data-aos="fade-in">
                            ** Please note that this will not be actual lending as this is only a demo showcase of a loan function in this project. Therefore, user are not required to input any real data.<br/>
                            ** In the real case scenario, the loan process would require more borrower information and a series of background checking and document verification. For example, the address proof, paycheck, etc. 
                            In other words, the calculation and credit scoring in PiggyBank Loan will not be 100% accurate due to the adjustment of the borrower's information.
                        </div>
                    </div>
                    }
                </div>
            </div>
            :
            <div className="missing_credit">
                <img src={missing_credit} width="192px" />
                PiggyBank Loan is not applicable to you according to your current Credit Scoring.<br/>
                <a href="/feature#credit">Learn More</a>
            </div>
            }
            <Footer/>
        </div>
    )
}

export default Loan;