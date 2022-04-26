import React, {useEffect} from "react";
import "./about.css"

import AOS from 'aos';
import 'aos/dist/aos.css';

import react from "../material/about/react.png"
import css from "../material/about/css.png"
import nodejs from "../material/about/nodejs.png"
import expressjs from "../material/about/expressjs.png"
import mysql from "../material/about/mysql.png"

import about_icon from "../material/about/about_icon.png"
import contact from "../material/about/contact.svg"

import Footer from '../comps/Footer';

const About = () => {

    useEffect(() => {
        AOS.init({duration: 800})
    }, [])

    return (
        <div className="about">
            <div className="about_header">
                <div className="about_header_txt">
                    PIGGYBANK
                </div>
                <div className="about_header_txt2">
                    A guardian of your money, love, and family.
                </div>
            </div>
            <div className="about_dev" id="dev">
                <div className="dev_txt">
                    Technologies
                </div>
                <div className="dev_txt2">
                    PIGGYBank uses modern technologies for web application development in a full-stack architecture. <d2-light>ReactJS</d2-light> and <d2-light>CSS</d2-light> are used for the fully responsive design and client-side components usage. On the other hand, <d2-light>NodeJS</d2-light> and <d2-light>ExpressJS</d2-light> are used for the backend application as RESTful API, with <d2-light>MySQL</d2-light> Database performing CRUD Operation in data management.
                </div>
                <div data-aos="zoom-out" data-aos-once="true" className="dev_showitem">
                    <div>
                        <div className="dev_react">
                            <img src={react} width='150' alt=""/>
                        </div>
                        <div className="dev_css">
                            <img src={css} width='150' alt=""/>
                        </div>
                    </div>
                    <div>
                        <div/>
                        <div className="dev_nodejs">
                            <img src={nodejs} width='150' alt=""/>
                        </div>
                        <div/>
                    </div>
                    <div>
                        <div className="dev_expressjs">
                            <img src={expressjs} width='150' alt=""/>
                        </div>
                        <div className="dev_mysql">
                            <img src={mysql} width='150' alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about_who">
                <div className="who_header_txt">
                    Who owns PiggyBank
                </div>
                <div className="who_content">
                    <div data-aos="zoom-out" data-aos-once="true" className="who_icon">
                        <img src={about_icon} width='300' alt=""/>
                    </div>
                    <div className="who_txt">
                        <div>
                            Rudy Yen
                        </div>
                        <div className="who_txt2">
                            A student major in Information Security and Computer Science.
                            <div className="who_socialmedia">
                                <a href="https://www.linkedin.com/in/rudy-yen-5b3173208/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="https://github.com/yenloned" target="_blank"><i className="fa-brands fa-github"></i></a>
                                <a href="mailto:rudyyen.work@gmail.com" target="_blank"><i className="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about_contact" id="contact">
                <div className="who_header_txt">
                    Contact PiggyBank
                </div>
                <div className="contact_content">
                    <div data-aos="zoom-out" data-aos-once="true" className="contact_png">
                        <img src={contact} width='750' alt=""/>
                    </div>
                    <div className="contact_inputform">
                        <i className="fa-solid fa-envelope" /> Piggybank.noreply@gmail.com
                        <div className="contact_leave">Leave a message</div>
                        <div className="contact_form">
                            <form>
                            <input type="text" placeholder="Leave a message here..."/>
                            <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About;