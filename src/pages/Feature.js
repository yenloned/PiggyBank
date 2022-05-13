import React, {useEffect} from "react";

import './service.css';
import './feature.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import security from "../material/icons/security.png"
import user_friendly from "../material/icons/user_friendly.png"
import functionality from "../material/icons/functionality.png"
import jwt from "../material/icons/jwt.png"
import hashing from "../material/icons/hashing.png"
import forgot from "../material/icons/forgot.png"
import auth from "../material/icons/auth.png"
import payee from "../material/icons/payee.png"
import responsive from "../material/icons/responsive.png"
import credit from "../material/icons/credit.png"
import calculator from "../material/icons/calculator.png"
import debt from "../material/icons/debt.png"
import history from "../material/icons/history.png"

import Footer from '../comps/Footer';

const Feature = () => {

    useEffect( () => {
        AOS.init({duration: 750})
    })

    return (
        <div>
            <div className="feature">
                <div className="service_topic">
                    LEARN MORE ABOUT OUR FEATURES
                </div>
                <div className="feature_topic_container">
                    <div data-aos="zoom-in" className="feature_topic_block">
                        <div className="feature_topic">Security</div>
                        <img src={security} width="192px" alt="" />
                        <div className="feature_topic_quote">
                            A series of security features and mechanisms are implemented to secure your account and data in confidentiality, integrity, and availability.
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="feature_topic_block">
                        <div className="feature_topic">User Friendly</div>
                        <img src={user_friendly} width="192px" alt="" />
                        <div className="feature_topic_quote">
                            PiggyBank has the featured design and layout to provide a user-friendly usage environment.
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="feature_topic_block">
                        <div className="feature_topic">Functionality</div>
                        <img src={functionality} width="192px" alt="" />
                        <div className="feature_topic_quote">
                            The implementation of featured functions gives more functionality to your user experience.
                        </div>
                    </div>
                </div>
                <div className="feature_container">
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={jwt} width="128px" alt="" />
                        <div className="feature_block_topic">JSON Web Token</div>
                        <div className="feature_block_quote">
                            It is a token generated by the algorithm to perform authorization for each user. 
                            It could prevent security attacks like <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Session_hijacking">Cookie/Session Hijacking</a>.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={hashing} width="128px" alt="" />
                        <div className="feature_block_topic">Password Hashing</div>
                        <div className="feature_block_quote">
                            A strong one-way hashing algorithm is implemented for the storage of passwords in the database. 
                            It could enhance the confidentiality of the user's password.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={forgot} width="128px" alt="" />
                        <div className="feature_block_topic">Forgot Password</div>
                        <div className="feature_block_quote">
                            This function could let user reset their account password with the verification code sent through the <a target="_blank" rel="noopener noreferrer" href="https://www.mailjet.com/">Mailjet SMTP Server</a>.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={auth} width="128px" alt="" />
                        <div className="feature_block_topic">Two Factor Authenication</div>
                        <div className="feature_block_quote">
                            Once that user's account has enabled this function, 
                            a verification code that is sent through <a target="_blank" rel="noopener noreferrer" href="https://www.mailjet.com/">Mailjet SMTP Server</a> would be asked before every login.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={payee} width="128px" alt="" />
                        <div className="feature_block_topic">Payee Registeration</div>
                        <div className="feature_block_quote">
                            Users could register other existing accounts as their payees. 
                            It increases the functionality and efficiency of other functions. For example, <a href="/transfer">Money Transfer</a> with Payee.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={responsive} width="128px" alt="" />
                        <div className="feature_block_topic">Fully Responsive</div>
                        <div className="feature_block_quote">
                            This feature offers a user-friendly display scale on all screen sizes. 
                            Therefore, users could have a good user experience with different devices.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={credit} width="128px" alt="" />
                        <div className="feature_block_topic">Credit Scoring</div>
                        <div className="feature_block_quote">
                            The algorithm is implemented based on the user's balance status, 
                            which is simulating the real-world <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Credit_rating">Credit Rating</a> which is used in loan applications.
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={calculator} width="128px" alt="" />
                        <div className="feature_block_topic">Loan/Insurance Calculator</div>
                        <div className="feature_block_quote">
                            With different users' input and options, the calculator would display the calculation result and change in real-time. 
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={debt} width="128px" alt="" />
                        <div className="feature_block_topic">Debt Record</div>
                        <div className="feature_block_quote">
                            All debt records of the users will be stored in the database after the loan application. 
                            It is used as one of the factors in credit scoring above. 
                        </div>
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={history} width="128px" alt="" />
                        <div className="feature_block_topic">Transaction History</div>
                        <div className="feature_block_quote">
                            All the details of account operations (Transfer, Withdrawal, Deposit, Application) would be recorded and checked in the user's profile. 
                        </div>
                    </div>
                </div>
            </div>
            
        <Footer/>
        </div>
    )
}

export default Feature;