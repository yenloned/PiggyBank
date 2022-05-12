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
                    <div className="feature_topic_block">
                        <div className="feature_topic">Security</div>
                        <img data-aos="zoom-in" src={security} width="192px" />
                        <div className="feature_topic_quote">
                            A series of security features and mechanisms are implemented to secure your account and data in confidentiality, integrity, and availability.
                        </div>
                    </div>
                    <div className="feature_topic_block">
                        <div className="feature_topic">User Friendly</div>
                        <img data-aos="zoom-in" src={user_friendly} width="192px" />
                        <div className="feature_topic_quote">
                            PiggyBank has the featured design and layout to provide a user-friendly usage environment.
                        </div>
                    </div>
                    <div className="feature_topic_block">
                        <div className="feature_topic">Functionality</div>
                        <img data-aos="zoom-in" src={functionality} width="192px" />
                        <div className="feature_topic_quote">
                            The implementation of featured functions gives more functionality to your user experience.
                        </div>
                    </div>
                </div>
                <div className="feature_container">
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={jwt} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={hashing} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={forgot} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={auth} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={payee} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={responsive} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={credit} width="128px" />
                    </div>
                    <div className="feature_block">
                        <img loading="lazy" data-aos="zoom-in" src={calculator} width="128px" />
                    </div>
                </div>
            </div>
            
        <Footer/>
        </div>
    )
}

export default Feature;