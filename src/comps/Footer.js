import React from "react";
import './footer.css';

const Footer = () =>{
    
    return(
        <div className="footer">
        <div className='footer_icon'>
          <a href='/'><i className="fas fa-piggy-bank" /> PIGGYBANK</a>
        </div>
        <div className='footer_service'>
            <div className="footer_header">
                Service
            </div>
            <a className="footer_list" href='/transfer'>Transfer</a>
            <a className="footer_list" href='/withdrawal'>Withdrawal</a>
            <a className="footer_list" href='/deposit'>Deposit</a>
            <a className="footer_list" href='/loan'>Loan</a>
            <a className="footer_list" href='/insurance'>Insurance</a>
        </div>
        <div className='footer_knowmore'>
            <div className="footer_header">
                Know More
            </div>
            <a className="footer_list" href='/about'>About us</a>
            <a className="footer_list" href='/feature'>Feature</a>
            <a className="footer_list" href='/feature#security'>Security</a>
            <a className="footer_list" href='/about#dev'>Development</a>
        </div>
        <div className='footer_support'>
            <div className="footer_header">
                Support
            </div>
            <a className="footer_list" href='/support=general'>FAQ</a>
            <a className="footer_list" target="_blank" rel="noopener noreferrer" href='https://bit.ly/the-power-of-link'>Privacy</a>
            <a className="footer_list" target="_blank" rel="noopener noreferrer" href='https://bit.ly/the-power-of-link'>Cookie</a>
            <a className="footer_list" href='/about#contact'>Contact us</a>
        </div>
        <div className='footer_link'>
            <div className="footer_header">
                Connect
            </div>
            <div className="footer_connect">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/rudy-yen-5b3173208/"><i className="fa-brands fa-linkedin"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/yenloned"><i className="fa-brands fa-github"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://reurl.cc/Np23Ek"><i className="fa-brands fa-instagram"></i></a>
                <a target="_blank" rel="noopener noreferrer" href="https://reurl.cc/Np23Ek"><i className="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        <div className="footer_copyright">
            ©2022 Rudy Yen. All rights reserved
        </div>
      </div>
    )
}

export default Footer