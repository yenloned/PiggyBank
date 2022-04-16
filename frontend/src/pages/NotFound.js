import React from "react";
import './notfound.css';
import notfound from "../material/pictures/notfound.png"

import Footer from '../comps/Footer';

const NotFound = () => {
    return (
        <React.Fragment>
        <h1>
            404 Not Found.<br/>Page Not Exist.<br/>
            <img src={notfound} alt="" width='300px' /><br/>
            <a className="homebutton" href="/">
                Back to Home Page
            </a>
         </h1>
         <br/>
         <div className="gethelp">
             <h1>
                 Any Problem?<br/>
                 <a className="supportbutton" href="/support=general">
                    Get Help
                </a>
             </h1>
         </div>
         < Footer />
         </React.Fragment>
    )
}

export default NotFound;