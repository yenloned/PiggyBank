import React, {useState, useEffect, useContext} from "react";
import './service.css';

import Axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

import AOS from 'aos';
import 'aos/dist/aos.css';

import cash_transfer from "../material/pictures/cash_transfer.png"
import cash_withdrawal from "../material/pictures/cash_withdrawal.png"
import cash_deposit from "../material/pictures/cash_deposit.png"
import low_interest from "../material/pictures/low_interest.png"
import high_amount from "../material/pictures/high_amount.png"
import long_duration from "../material/pictures/long_duration.png"
import no_fee from "../material/pictures/no_fee.png"

import accident_insurance from "../material/pictures/accident_insurance.png"
import cancer_insurance from "../material/pictures/cancer_insurance.png"
import life_insurance from "../material/pictures/life_insurance.png"

import Footer from '../comps/Footer';
import {LoginIDContext} from "../context/LoginContext";
import {LoginStatusContext} from "../context/LoginContext";

const Service = () => {

    Axios.defaults.withCredentials = true;

    const {loginID} = useContext(LoginIDContext);
    const {loginStatus} = useContext(LoginStatusContext);
    
    //loan
    const [calculatorAmount, setCalculatorAmount] = useState(10000)
    const [calculatorTenor, setCalculatorTenor] = useState(3)
    const [calculatorAPR, setCalculatorAPR] = useState(1.67)
    const [calculatorMFR, setCalculatorMFR] = useState(calculatorAPR/(calculatorTenor*1.9))
    const [calculatorHandlingFee, setCalculatorHandlingFee] = useState(1*(calculatorAmount/1500000))
    //insurance
    const [insuranceChoice, setInsuranceChoice] = useState("Life Term Insurance")
    const [insuranceGender, setInsuranceGender] = useState("male")
    const [insuranceSmoking, setInsuranceSmoking] = useState(false)
    //life
    const [insuranceAge, setInsuranceAge] = useState(18)
    const [lifeInsuranceAmount, setLifeInsuranceAmount] = useState(200000)
    const [cancerInsuranceAmount, setCancerInsuranceAmount] = useState(0)
    const [accidentInsuranceAmount, setAccidentInsuranceAmount] = useState(10000)
    const [insuranceHighest, setInsuranceHighest] = useState(10000000)
    const [insuranceBonus, setInsuranceBonus] = useState(1)
    //cancer
    const [smokeCancerBonus, setSmokeCancerBonus] = useState(1)
    //accident
    const [accidentGender, setAccidentGender] = useState("male")
    const [accidentBonus, setAccidentBonus] = useState(1)

    const [insuranceMsg, setInsuranceMsg] = useState("")

    const switch_insurance = (plan) => {
        setInsuranceChoice(plan)
        setInsuranceMsg("")
    }

    const switchingGender = (switchID, disableID, gender) => {
        const turnOn = document.getElementById(switchID)
        turnOn.style.background = "rgb(255, 223, 79)";
        turnOn.style.color = "rgb(25,25,25)";
        const turnOff = document.getElementById(disableID)
        turnOff.style.background = "none";
        turnOff.style.color = "rgb(255, 223, 79)";
        setInsuranceGender(gender)
    }

    const switchingGender_Accident = (switchID, disableID, gender) => {
        const turnOn = document.getElementById(switchID)
        turnOn.style.background = "rgb(255, 223, 79)";
        turnOn.style.color = "rgb(25,25,25)";
        const turnOff = document.getElementById(disableID)
        turnOff.style.background = "none";
        turnOff.style.color = "rgb(255, 223, 79)";
        setAccidentGender(gender)
    }

    const switchingSmoke = (switchID, disableID, smokingStatus) => {
        const turnOn = document.getElementById(switchID)
        turnOn.style.background = "rgb(255, 223, 79)";
        turnOn.style.color = "rgb(25,25,25)";
        const turnOff = document.getElementById(disableID)
        turnOff.style.background = "none";
        turnOff.style.color = "rgb(255, 223, 79)";
        setInsuranceSmoking(smokingStatus)
    }

    useEffect( () => {
        AOS.init({duration: 650})
        setCalculatorAmount(Math.floor(calculatorAmount))
        setCalculatorTenor(Math.floor(calculatorTenor))
        setCalculatorMFR(Math.floor(calculatorAPR/(calculatorTenor*1.9) * 100) / 100)
        setCalculatorHandlingFee(Math.floor(1*(calculatorAmount/1500000) * 100) / 100)

        if (insuranceAge > 20){
            setInsuranceHighest(12000000 - (Math.floor(insuranceAge / 10) - 1)* 2000000 )
        }else{
            setInsuranceHighest(10000000)
        }
        if (insuranceAge > 65){
            setInsuranceAge(65)
        }else if (insuranceAge > 18){
            setInsuranceAge(18)
        }
        if (calculatorAmount < 10000){
            setCalculatorAmount(10000)
        }else if(calculatorAmount > 1500000){
            setCalculatorAmount(1500000)
        }
        if (calculatorTenor < 3){
            setCalculatorTenor(3)
        }else if(calculatorTenor > 60){
            setCalculatorTenor(60)
        }
        if (calculatorAPR < 1.67){
            setCalculatorAPR(1.67)
        }else if(calculatorAPR > 100){
            setCalculatorAPR(100)
        }
        //life
        if (lifeInsuranceAmount < 200000){
            setLifeInsuranceAmount(200000)
        }else if (lifeInsuranceAmount > insuranceHighest){
            setLifeInsuranceAmount(insuranceHighest)
        }
        if (insuranceSmoking && insuranceGender == "male"){
            setInsuranceBonus(1.32)
        }else if(insuranceSmoking){
            setInsuranceBonus(1.28)
        }else if (insuranceGender == "male"){
            setInsuranceBonus(1.15)
        }else{
            setInsuranceBonus(1)
        }
        //cancer
        if (insuranceSmoking){
            setSmokeCancerBonus(1.5)
        }else{
            setSmokeCancerBonus(1)
        }
        //accident
        if (accidentInsuranceAmount < 10000){
            setAccidentInsuranceAmount(10000)
        }else if (accidentInsuranceAmount > 500000){
            setAccidentInsuranceAmount(500000)
        }
        if (accidentGender == "male"){
            setAccidentBonus(1.33)
        }else{
            setAccidentBonus(1)
        }
    })

    const apply_insurance = (type, repay, amount) => {
        if (!loginStatus){
            window.location.replace("/login")
        }else{
            Axios.post(`${API_BASE_URL}${API_ENDPOINTS.CHECK_SUB}`,{
                searchingID: loginID
            }).then((result) => {
                if (!result.data.length){
                    Axios.post(`${API_BASE_URL}${API_ENDPOINTS.INSURANCE}`,{
                        insurance_userid: loginID,
                        insurance_repay: repay,
                        insurance_amount: amount,
                        plan_name: type
                    })
                    window.location.replace("/history")
                }else{
                    setInsuranceMsg("You have already subscribed to this plan.")
                }
            })
        }
    }

    return (
        <div className="service">
            <div className="service_topic">
                DISCOVER WHAT WE HAVE PROVIDED FOR YOU
            </div>
            <div className="service_bank_operation" id="operation">
                <div className="service_title">
                    Bank Operations
                </div>
                <div data-aos="zoom-in" className="service_operation_container">
                    <div  className="service_operation_block">
                        <div><img data-aos="zoom-in" data-aos-once="false" src={cash_transfer} width='160' alt=""/></div>
                        <div className="service_block_container">
                            <div className="service_block_title">Transfer</div>
                            <div className="service_block_list">
                                <div><i className="fa-solid fa-circle-check"></i> 24/7 with instant handling</div>
                                <div><i className="fa-solid fa-circle-check"></i> Payee registration function</div>
                                <div><i className="fa-solid fa-circle-check"></i> No extra fee</div>
                            </div>
                            <div className="service_block_txt">
                                PiggyBank provides 24/7 instant money transfer for you. 
                                Payee registeration is adopted in this service which make your experience faster, more convenience with no extra fee charging.
                            </div>
                        </div>
                    </div>
                    <div className="service_operation_block">
                        <div><img data-aos="zoom-in" data-aos-once="false" src={cash_withdrawal} width='160' alt=""/></div>
                        <div className="service_block_container">
                            <div className="service_block_title">Withdrawal</div>
                            <div className="service_block_list">
                                <div><i className="fa-solid fa-circle-check"></i> 24/7 with instant handling</div>
                                <div><i className="fa-solid fa-circle-check"></i> Easy Interface</div>
                                <div><i className="fa-solid fa-circle-check"></i> No extra fee</div>
                            </div>
                            <div className="service_block_txt">
                                PiggyBank provides 24/7 instant money withdrawal for you. 
                                It is easy to use which make your experience faster, more convenience with no extra fee charging.
                            </div>
                        </div>
                    </div>
                    <div className="service_operation_block">
                        <div><img data-aos="zoom-in" data-aos-once="false" src={cash_deposit} width='160' alt=""/></div>
                        <div className="service_block_container">  
                            <div className="service_block_title">Deposit</div>
                            <div className="service_block_list">
                                <div><i className="fa-solid fa-circle-check"></i> 24/7 with instant handling</div>
                                <div><i className="fa-solid fa-circle-check"></i> Easy Interface</div>
                                <div><i className="fa-solid fa-circle-check"></i> No extra fee</div>
                            </div>
                            <div className="service_block_txt">
                                PiggyBank provides 24/7 instant money deposit for you. 
                                It is easy to use which make your experience faster, more convenience with no extra fee charging.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="service_loan" id="loan">
                <div className="service_title">
                    Loan
                </div>
                <div className="service_loan_container">
                    <div className="service_loan_block">
                        <div><img data-aos="zoom-in" data-aos-duration="800" src={low_interest} width='96' alt=""/></div>
                        <div className="service_block_title">Low Interest Rate</div>
                        <div className="service_loan_txt">
                            PiggyBank provides a low interest rate as APR <a>1.67%</a>.
                        </div>
                    </div>
                    <div className="service_loan_block">
                        <div><img data-aos="zoom-in" data-aos-duration="800" src={high_amount} width='96' alt=""/></div>
                        <div className="service_block_title">High Loan Amount</div>
                        <div className="service_loan_txt">
                            A high loan amount which up to <a>HKD 1,500,000</a> could be loaned.
                        </div>
                    </div>
                    <div className="service_loan_block">
                        <div><img data-aos="zoom-in" data-aos-duration="800" src={long_duration} width='96' alt=""/></div>
                        <div className="service_block_title">Long Repayment Tenor</div>
                        <div className="service_loan_txt">
                            Long repayment tenor up to <a>60 months</a> is provided.
                        </div>
                    </div>
                    <div className="service_loan_block">
                        <div><img data-aos="zoom-in" data-aos-duration="800" src={no_fee} width='96' alt=""/></div>
                        <div className="service_block_title">Low Handling Fee</div>
                        <div className="service_loan_txt">
                            Only <a>0% to 1%</a> handling fee is charged in Piggybank Loan.
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in" className="service_demotxt">
                    YOU CAN TRY OUR DEMO IN THE LOAN CALCULATOR BELOW.
                </div>
                <div className="service_loan_calculator">
                    <div data-aos="fade-in" className="calculator_title">
                        Loan Calculator
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_content">
                            <div className="calculator_title2">Amount (HKD)</div>
                            <div><input type="number" min="10000" max="1500000" onChange={(e) => {setCalculatorAmount(e.target.value);}} value={calculatorAmount} /></div>
                        </div>
                        <div className="calculator_slider">
                            <input type="range" min="10000" max="1500000" value={calculatorAmount} step="10000"
                            onChange={(e) => {setCalculatorAmount(e.target.value);}} className="calculator_slider_range"/>
                        </div>
                        <div className="calculator_range_num">
                            <div>HKD 10,000</div>
                            <div>HKD 1,500,000</div>
                        </div>
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_content">
                            <div className="calculator_title2">Tenor (Months)</div>
                            <div><input type="number" onChange={(e) => {setCalculatorTenor(e.target.value);}} value={calculatorTenor} /></div>
                        </div>
                        <div className="calculator_slider">
                            <input type="range" min="3" max="60" value={calculatorTenor} step="1"
                            onChange={(e) => {setCalculatorTenor(e.target.value);}} className="calculator_slider_range"/>
                        </div>
                        <div className="calculator_range_num">
                            <div>3 Months</div>
                            <div>60 Months</div>
                        </div>
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_content">
                            <div className="calculator_title2">Annualized Percentage Rate (APR)</div>
                            <div><input type="number" onChange={(e) => {setCalculatorAPR(e.target.value);}} value={calculatorAPR} /></div>
                        </div>
                        <div className="calculator_slider">
                            <input type="range" min="1.67" max="100" value={calculatorAPR} step="0.01"
                            onChange={(e) => {setCalculatorAPR(e.target.value);}} className="calculator_slider_range"/>
                        </div>
                        <div className="calculator_range_num">
                            <div>1.67%</div>
                            <div>100%</div>
                        </div>
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_result">
                            <div className="calculator_result_block">
                                <div className="calculator_result_title">Monthly Flat Rate (MFR)</div>
                                <div className="calculator_result_data">{calculatorMFR} %</div>
                            </div>
                            <div className="calculator_result_block">
                                <div className="calculator_result_title">Handling Fee (HKD)</div>
                                <div className="calculator_result_data">{Math.round(1500000*(calculatorHandlingFee/100))} ({calculatorHandlingFee}%)</div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_content">
                            <div className="calculator_title2">Monthly Repayment</div>
                            <div className="calculator_monthly_repayment">
                                HKD {Math.round(
                                    calculatorAmount /
                                    (
                                    ( ((1 + (calculatorAPR/1200))**calculatorTenor) - 1 ) / 
                                    ( (calculatorAPR/1200) * ((1+(calculatorAPR/1200))**calculatorTenor))
                                    )
                                ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-in">
                        <div className="calculator_claim">
                            ** The monthly repayment amount and the monthly repayment shown in the above calculation are for illustrative purpose only.
                            The actual repayment amount and the monthly repayment may vary. 
                            Interest rates vary depending on the credit scoring and our final assessment of your application.<br/>
                            ** The above demo calculation method would be following the amortization payments formula.
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in">
                    <button className="service_get_started">
                        <a href="/loan">Check Out More</a>
                    </button>
                </div>
            </div>
            <div className="service_insurance" id="insurance">
                <div className="service_title">
                    Insurance
                </div>
                <div className="service_insurance_subtitle">
                    PiggyBank provides 3 major fields of Insurance to guard your wealth, health, and family.
                </div>
                <div className="service_insurance_choice">
                    <div className={insuranceChoice === "Life Term Insurance" ? "service_insurance_block_active" : "service_insurance_block"} onClick={() => switch_insurance("Life Term Insurance")}>
                        <div><img data-aos="zoom-in" src={life_insurance} width='192' alt=""/></div>
                        <div className="insurance_block_content">
                            <div className="service_block_title">Life Term Insurance</div>
                            <div className="service_insurance_txt">
                                Life Term Insurance is a lifelong subscription as long as payment is settled.
                                The Beneficiary will receive a death benefit if the insured person dies in the period of subscription. Assured amount could be <a>up to HKD 10,000,000</a>.
                            </div>
                        </div>
                    </div>
                    <div className={insuranceChoice === "Cancer Insurance" ? "service_insurance_block_active" : "service_insurance_block"} onClick={() => switch_insurance("Cancer Insurance")}>
                        <div><img data-aos="zoom-in" src={cancer_insurance} width='192' alt=""/></div>
                        <div className="insurance_block_content">
                            <div className="service_block_title">Cancer Insurance</div>
                            <div className="service_insurance_txt">
                                Cancer Insurance would fully cover the medical cost of diagnosis, treatment, recovery, and terminal for any kind of cancer.
                                3 Benefit Options can be chosen which have the most coverage costs <a>up to HKD 3,000,000</a>.
                            </div>
                        </div>
                    </div>
                    <div className={insuranceChoice === "Accident Insurance" ? "service_insurance_block_active" : "service_insurance_block"} onClick={() => switch_insurance("Accident Insurance")}>
                        <div><img data-aos="zoom-in" src={accident_insurance} width='192' alt=""/></div>
                        <div className="insurance_block_content">
                            <div className="service_block_title">Accident Insurance</div>
                            <div className="service_insurance_txt">
                                Accident Insurance covers the medical cost of accidents like outpatient treatment, inpatient treatment, and surgery.
                                Covers 700+ Job positions like drivers, construction workers, and fitness trainers. Assured amount could be <a>up to HKD 500,000</a> annually.
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in" className="service_demotxt">
                    YOU CAN SUBSCRIBE OUR INSURANCE PLAN WITH THE INSURANCE CALCULATOR BELOW.
                </div>
                <div className="service_insurance_calculator"> 
                    <div data-aos="fade-in" className="calculator_title">
                        {insuranceChoice}
                    </div>
                    {insuranceChoice === "Accident Insurance" ? "" :
                    <div>
                        <div data-aos="fade-in" className="calculator_info">
                            <div className="insurance_gender">
                                <div>Gender</div>
                                <div className="insurance_choice">
                                    <div className="gender_male" onClick={() => switchingGender("insurance_gender_male", "insurance_gender_female", "male")}>
                                        <i className="fa-solid fa-person" id="insurance_gender_male"></i>
                                    </div>
                                    <div className="gender_female" onClick={() => switchingGender("insurance_gender_female", "insurance_gender_male", "female")}>
                                        <i className="fa-solid fa-person-dress" id="insurance_gender_female"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="insurance_smoke">
                                <div>Smoking Status</div>
                                <div className="insurance_choice">
                                    <div className="smoke_yes" onClick={() => switchingSmoke("insurance_smoking_yes", "insurance_smoking_no", true)}>
                                    <i className="fa-regular fa-circle-check" id="insurance_smoking_yes"></i>
                                    </div>
                                    <div className="smoke_no" onClick={() => switchingSmoke("insurance_smoking_no", "insurance_smoking_yes", false)}>
                                        <i className="fa-regular fa-circle-xmark" id="insurance_smoking_no"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {insuranceChoice === "Life Term Insurance" &&
                    <div>
                        <div data-aos="fade-in" className="insurance_age">
                            <div className="calculator_title2">Age</div>
                            <div className="insurance_data">
                                <input type="number" onChange={(e) => {setInsuranceAge(e.target.value);}} value={insuranceAge} />
                            </div>
                            <div className="calculator_slider">
                                <input type="range" min="18" max="65" value={insuranceAge} step="1"
                                onChange={(e) => {setInsuranceAge(e.target.value);}} className="calculator_slider_range"/>
                            </div>
                            <div className="calculator_range_num">
                                <div>18 Years Old</div>
                                <div>65 Years Old</div>
                            </div>
                        </div>
                        <div data-aos="fade-in">
                            <div className="calculator_title2">Assured Amount (HKD)</div>
                            <div className="insurance_data">
                                <input type="number" onChange={(e) => {setLifeInsuranceAmount(e.target.value);}} value={lifeInsuranceAmount} />
                            </div>
                            <div className="calculator_slider">
                                <input type="range" min="200000" max={insuranceHighest} value={lifeInsuranceAmount} step="50000"
                                onChange={(e) => {setLifeInsuranceAmount(e.target.value);}} className="calculator_slider_range"/>
                            </div>
                            <div className="calculator_range_num">
                                <div>HKD 200,000</div>
                                <div>HKD {insuranceHighest.toLocaleString()}</div>
                            </div>
                        </div>
                        <div data-aos="fade-in">
                            <div className="calculator_title2">Monthly Repayment</div>
                            <div className="calculator_monthly_repayment">
                                HKD {Math.round(
                                    (lifeInsuranceAmount * 1.025) * 0.000025 * insuranceBonus * ( ((insuranceAge) / 10) * Math.floor(Math.log(insuranceAge * 2) / Math.log(3-insuranceBonus) - 3) )
                                    ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                        </div>
                        <div data-aos="fade-in" className="loan_calculator_claim">
                            ** The monthly repayment amount and the monthly repayment shown in the above calculation are for illustrative purpose only.
                            The actual premiums are affected by time, inflation, underwriting, Insurance Authority levies and other factors. <br/>
                            ** The above demo calculation method would be following the statistical data on the age of death in gender and smoking population.
                        </div>
                        <div data-aos="zoom-in">
                            <button className="service_get_started" onClick={() => apply_insurance("Life Term Insurance", Math.round((lifeInsuranceAmount * 1.025) * 0.000025 * insuranceBonus * ( ((insuranceAge) / 10) * Math.floor(Math.log(insuranceAge * 2) / Math.log(3-insuranceBonus) - 3) )), lifeInsuranceAmount )}>
                                Apply Now
                            </button>
                        </div>
                        <div className="insurance_msg">
                            {insuranceMsg}
                        </div>
                    </div>
                    }
                    {insuranceChoice === "Cancer Insurance" && 
                    <div>
                        <div data-aos="fade-in" className="insurance_age">
                            <div className="calculator_title2">Age</div>
                            <div className="insurance_data">
                                <input type="number" onChange={(e) => {setInsuranceAge(e.target.value);}} value={insuranceAge} />
                            </div>
                            <div className="calculator_slider">
                                <input type="range" min="18" max="65" value={insuranceAge} step="1"
                                onChange={(e) => {setInsuranceAge(e.target.value);}} className="calculator_slider_range"/>
                            </div>
                            <div className="calculator_range_num">
                                <div>18 Years Old</div>
                                <div>65 Years Old</div>
                            </div>
                        </div>
                        <div data-aos="fade-in">
                            <div className="calculator_title2">Assured Amount Options (HKD)</div>
                            <div className="cancer_insurance_choice">
                                <div><input type="radio" name="cancer_plans" id="cancer_plans" value="1000000" onChange={(e) => {setCancerInsuranceAmount(e.target.value);}}/> HKD 1,000,000</div>
                                <div><input type="radio" name="cancer_plans" id="cancer_plans" value="2000000" onChange={(e) => {setCancerInsuranceAmount(e.target.value);}}/> HKD 2,000,000</div>
                                <div><input type="radio" name="cancer_plans" id="cancer_plans" value="3000000" onChange={(e) => {setCancerInsuranceAmount(e.target.value);}}/> HKD 3,000,000</div>
                            </div>
                        </div>
                        <div data-aos="fade-in">
                            <div className="calculator_title2">Monthly Repayment</div>
                            {cancerInsuranceAmount ?
                            <div className="calculator_monthly_repayment">
                            HKD {Math.round(
                                (cancerInsuranceAmount * (cancerInsuranceAmount / 1250000 ) * 0.000025 * insuranceBonus * 
                                (((insuranceAge) / 10)* Math.floor(Math.log(insuranceAge) / Math.log(3)) )
                                ) * smokeCancerBonus
                                ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            :
                            <div className="cancer_insurance_msg"> Please select the Assured Amount Options </div>
                            }
                            <div className="loan_calculator_claim">
                                ** The monthly repayment amount and the monthly repayment shown in the above calculation are for illustrative purpose only.
                                The actual premiums are affected by time, inflation, underwriting, Insurance Authority levies and other factors. <br/>
                                ** The above demo calculation method would be following the statistical data on the age of cancer in gender and smoking population.
                            </div>
                            { cancerInsuranceAmount ?
                            <div data-aos="zoom-in">
                                <button className="service_get_started" onClick={() => apply_insurance("Cancer Insurance", Math.round((cancerInsuranceAmount * (cancerInsuranceAmount / 1250000 ) * 0.000025 * insuranceBonus * (((insuranceAge) / 10)* Math.floor(Math.log(insuranceAge) / Math.log(3)) )) * smokeCancerBonus), cancerInsuranceAmount )}>
                                    Apply Now
                                </button>
                                <div className="insurance_msg">
                                    {insuranceMsg}
                                </div>
                            </div>
                            :
                            ""}
                        </div>
                    </div>
                    }
                    {insuranceChoice === "Accident Insurance" &&
                    <div>
                        <div data-aos="fade-in" className="insurance_gender">
                            <div className="calculator_title2">Gender</div>
                            <div className="insurance_choice">
                                <div className="gender_male" onClick={() => switchingGender_Accident("accident_male", "accident_female", "male")}>
                                    <i className="fa-solid fa-person" id="accident_male"></i>
                                </div>
                                <div className="gender_female" onClick={() => switchingGender_Accident("accident_female", "accident_male", "female")}>
                                    <i className="fa-solid fa-person-dress" id="accident_female"></i>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-in" className="insurance_age">
                            <div className="calculator_title2">Age</div>
                            <div className="insurance_data">
                                <input type="number" onChange={(e) => {setInsuranceAge(e.target.value);}} value={insuranceAge} />
                            </div>
                            <div className="calculator_slider">
                                <input type="range" min="18" max="65" value={insuranceAge} step="1"
                                onChange={(e) => {setInsuranceAge(e.target.value);}} className="calculator_slider_range"/>
                            </div>
                            <div className="calculator_range_num">
                                <div>18 Years Old</div>
                                <div>65 Years Old</div>
                            </div>
                            <div data-aos="fade-in">
                                <div className="calculator_title2">Annual Assured Amount (HKD)</div>
                                <div className="insurance_data">
                                    <input type="number" onChange={(e) => {setAccidentInsuranceAmount(e.target.value);}} value={accidentInsuranceAmount} />
                                </div>
                                <div className="calculator_slider">
                                    <input type="range" min="10000" max="500000" value={accidentInsuranceAmount} step="10000"
                                    onChange={(e) => {setAccidentInsuranceAmount(e.target.value);}} className="calculator_slider_range"/>
                                </div>
                                <div className="calculator_range_num">
                                    <div>HKD 10,000</div>
                                    <div>HKD 500,000</div>
                                </div>
                            </div>
                            <div data-aos="fade-in">
                                <div className="calculator_title2">Monthly Repayment</div>
                                <div className="calculator_monthly_repayment">
                                    HKD {Math.round(
                                        ( (accidentInsuranceAmount * 1.025) * 0.0015 * Math.ceil((insuranceAge) / 10) + 1 ) * accidentBonus
                                        ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </div>
                            <div data-aos="fade-in" className="loan_calculator_claim">
                                ** The monthly repayment amount and the monthly repayment shown in the above calculation are for illustrative purpose only.
                                The actual premiums are affected by time, inflation, underwriting, Insurance Authority levies and other factors. <br/>
                                ** The above demo calculation method would be following the statistical data on the career preference by gender and the possibility of injury frequent by age.
                            </div>
                        </div>
                        <div data-aos="zoom-in" onClick={() => apply_insurance("Accident Insurance", Math.round(((accidentInsuranceAmount * 1.025) * 0.0015 * Math.ceil((insuranceAge) / 10) + 1 ) * accidentBonus), accidentInsuranceAmount) }>
                            <button className="service_get_started">
                                Apply Now
                            </button>
                        </div>
                        <div className="insurance_msg">
                            {insuranceMsg}
                        </div>
                    </div>
                    }
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Service;