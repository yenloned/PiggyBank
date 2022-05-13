import React from "react";
import './notfound.css';
import notfound from "../material/pictures/notfound.gif"

import Footer from '../comps/Footer';

const NotFound = () => {
    return (
        <div className="notfound">
            <div className="notfound_header">
                I don't think there is what you are looking for...<br/>
                Why are you here anyway?<br/>
            </div>
            <img src={notfound} alt="" width='300px' /><br/>
            <a className="homebutton" href="/">
                Back to Home Page
            </a>
         <br/>
         <div className="gethelp">
                 Any Problems?<br/>
                 <a className="supportbutton" href="/support=general">
                    Get Help
                </a>
         </div>
         < Footer />
         </div>
    )
}

export default NotFound;