//3002
require("dotenv").config();
const express = require("express");

//router
const router = express.Router()

const bodyParser = require('body-parser');
const cors = require("cors");
const nodemailer = require("nodemailer");

const SMTP_host = process.env.SMTP_HOST
const SMTP_port = process.env.SMTP_PORT
const SMTP_username = process.env.SMTP_USER
const SMTP_password = process.env.SMTP_PASSWORD

const transport = nodemailer.createTransport({
    host: SMTP_host,
    port: SMTP_port,
    auth: {
        user: SMTP_username,
        pass: SMTP_password
    }
})

router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

router.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

//mysql connection
const mysql = require("mysql");
const dbpassword = process.env.DBPASSWORD
const dbuser = process.env.DBUSER
const db_user = mysql.createConnection({
    user: dbuser,
    host: "localhost",
    password: dbpassword,
    database: "user"
});


router.post("/reset_email", cors(), (req,res) => {
    const targetemail = req.body.targetemail

    db_user.query("SELECT verification FROM user WHERE email = ?", 
    targetemail, (err, result) => {
        if (err){return}
        const randomcode = result[0]["verification"]
        transport.sendMail({
            from:"piggybank.noreply@gmail.com",
            to:targetemail,
            subject:"PiggyBank Account - Verification Code for Reset Password",
            html:`<h4>Here is your verification code:</h4><br/>
            <h3>${randomcode}</h3><br/>
            <h4>Please do not reply to this email.</h4>
            <h4>Any question, please contact rudyyen.work@gmail.com</h4>`
        })
    })
})

router.post("/notice_email", cors(), async (req,res) => {
    const targetemail = req.body.noticeEmail

    await transport.sendMail({
        from:"piggybank.noreply@gmail.com",
        to:targetemail,
        subject:"PiggyBank Account - Reset Password Notification",
        html:`<h4>Hello!</h4>
        <h4>Your password at PiggyBank has been changed. Please ignore this email if it is authorized.</h4>
        <h4>If not, please contact rudyyen.work@gmail.com as it might considered as a security problem.</h4>
        <h4>Please do not reply to this email.</h4>
        <br/><h4>PiggyBank</h4>`
    })
})

module.exports = router