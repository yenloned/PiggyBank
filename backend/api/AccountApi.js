//3001
//.env
require('dotenv').config();
const dbpassword = process.env.DBPASSWORD
const dbuser = process.env.DBUSER
const dbhost = process.env.DBHOST
const dbname = process.env.DBNAME
const session_secret = process.env.SESSIONSECRET
const jwt_secret = process.env.JWTTOKEN
const saltRoute = parseInt(process.env.SALT)

//api require
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//router
const router = express.Router()

//cookie and session require
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//hash require
const bcrypt = require('bcrypt');

//jwt
const jwt = require('jsonwebtoken');


//app use
router.use(express.json());
router.use(cors({
    origin: "https://piggybank-web.netlify.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true}));

//cookie config
router.use(session({
    name: "user",
    secret: session_secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 120 * 60 * 1000
    }
}));


//mysql connection
const db_user = mysql.createConnection({
    user: dbuser,
    host: dbhost,
    password: dbpassword,
    database: dbname
});


//register
router.post('/register', (req, res) => {

    //input parameter
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    //hash the input password (with salt as saltRoute)
    bcrypt.hash(password, saltRoute, (err, hashedpw) => {
        if (err){
            res.send(err)
        }
        //insert the hashed password instead of the password input from parameter
        db_user.query("INSERT INTO user (email, password, firstname, lastname) VALUES (?,?,?,?)", 
            [email, hashedpw, firstname, lastname], (err, result) => {
                res.send(err);
        })
    })
})

//check if registered
router.post('/registered', (req,res) => {
    const cemail = req.body.cemail

    db_user.query("SELECT email FROM user WHERE email = ?;",
    cemail, (err, result) => {
        res.send(result)
    })
})


//JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token){
        res.send("Missing Token.")
    }else{
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if(err){
                res.json({auth: false, message: "Auth Failed"})
            }else{
                res.user_id = decoded.id
                next()
            }
        })
    }
}
//verifying the JWT Token
router.get("/auth", verifyJWT, (req, res) => {
    res.send("User authed")
})


//check if logged in
router.get("/loggedin", (req, res) => {
    if (req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

//login
router.post('/login', (req, res) => {

    //input parameter
    const email = req.body.email;
    const password = req.body.password;

    //check if the email really exist
    db_user.query("SELECT * FROM user WHERE email = ?;", 
            email, (err, result) => {
                if (err){
                    res.send(err);
                }
                
                //If yes, there will be result (length > 0); If no, there will be no result (length = 0)
                //length > 0
                if (result.length > 0){
                    //compare the input password and the hashed password stored in database
                    //comparedresult will be a Boolean
                    bcrypt.compare(password, result[0].password, (err,comparedresult) =>{
                        //If success, cookie session and JWT token will be signed and assigned to user
                        if (comparedresult){

                            const user_id = result[0].user_id
                            const jwttoken = jwt.sign({user_id}, jwt_secret, {expiresIn: 7200})
                            const cookievalue = user_id + session_secret
                            //assign cookie
                            req.session.user = result;

                            //assign jwt
                            res.json({auth: true, token: jwttoken, result: cookievalue});
                        //If fail, response as authenication fail
                        }else{
                            res.json({auth: false});
                        }
                    })
                //length = 0, response as authnication fail
                }else{
                    res.json({auth: false})
                }
        })
    })

//logout
router.get('/logout', function(req, res) {
    req.session.destroy()
 });

//store verification code
 router.post("/store_code", (req,res) => {
    //generate random code
    const storeCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
    const storeEmail = req.body.storeEmail

    //store the generated random code into the database's user column
    db_user.query("UPDATE user SET verification = ? WHERE email = ?;", 
    [storeCode, storeEmail], (err, result) => {
        res.send(result);
    })
})

 //check verification code
 router.post("/check_code", (req, res) =>{
    const check_target = req.body.user_email
    const code = req.body.code

    db_user.query("SELECT verification FROM user WHERE email = ?;", 
    check_target, (err, result) => {
        if (code == result[0]["verification"]){
            res.send(true)
        }else{
            res.send(false)
        }
    })
 })

 //change password
 router.post("/change_password", (req, res) => {
    const newpassword = req.body.newpassword
    const targetEmail = req.body.targetEmail

    bcrypt.hash(newpassword, saltRoute, (err, hashednewpw) => {
        const hash = hashednewpw
        if (err){
            res.send(err)
        }else{
        db_user.query("UPDATE user SET password = ? WHERE email = ?;", 
            [hash, targetEmail], (err, result) => {
                res.send(result);
            })
        }
    })
 })

 //check password
 router.post("/check_password", (req, res) => {
    const user_id = req.body.user_id_checkpassword
    const input_password = req.body.input_password

    db_user.query("SELECT password FROM user WHERE user_id = ?;", 
    user_id, (err, result) => {
        bcrypt.compare(input_password, result[0].password, (err,comparedresult) =>{
            if (comparedresult){
                res.send("Check Password Passed")
            }else{
                res.send("Check Password Failed")
            }
        })
    })

 })

 //check if turn on 2FA
 router.post("/check_2FA", (req, res) =>{
    const user_email = req.body.user_email
    
    db_user.query("SELECT 2FA FROM user WHERE email = ?;",
    user_email, (err, result) =>{
        if (result[0]["2FA"]){
            res.send(true)
        }else{
            res.send(false)
        }
    })
 })

 //credit scoring
 router.post("/credit_scoring", (req, res) =>{
    const balance = req.body.balance
    const debt = req.body.debt
//change it
    if(balance == 0 && debt == 0){
        return res.send("Not Applicable")
    }if(debt/balance >= 2) {
        return res.send("D")
    }if(debt/balance >= 1){
        return res.send("C")
    }if(debt/balance >= 0.75){
        return res.send("CC")
    }if(debt/balance >= 0.5 || balance <= 10000){
        return res.send("CCC")
    }if(balance <= 250000){
        return res.send("B")
    }if(debt/balance >= 0.3 || balance <= 500000){
        return res.send("BB")
    }if(balance <= 1000000){
        return res.send("BBB")
    }if(debt/balance >= 0.2 && balance <= 15000000){
        return res.send("A")
    }if(debt/balance >= 0.1 && balance <= 30000000){
        return res.send("AA")
    }else{
        return res.send("AAA")
    }
})

//update credit
 router.post("/update_credit", (req, res) =>{
    const searchingID = req.body.searchingID
    const credit = req.body.credit

    db_user.query("UPDATE user SET credit = ? WHERE user_id = ?;",
    [credit, searchingID])
 })

 //get debt by ref
 router.post("/get_debt_byref", (req, res) => {
    const searchingRef = req.body.searchingRef

    db_user.query("SELECT total FROM debt WHERE ref = ?;", searchingRef, (err, debt) => {
        res.send(debt[0])
    })
 })

 //pay debt
 router.post("/pay_debt", (req, res) =>{
    const debtAmount = req.body.debtAmount
    const searchingRef = req.body.searchingRef
    const searchingID = req.body.searchingID

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [searchingID, searchingID, "Pay Off", debtAmount, time])
    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [debtAmount, searchingID])
    db_user.query("DELETE FROM debt WHERE ref = ?;", searchingRef, (err, result) => {
        return res.send(true)
    })
 })

 //delete account
 router.post("/delete_account", (req, res) =>{
     const user_id_delteaccount = req.body.user_id_deleteaccount

     db_user.query("DELETE FROM user WHERE user_id = ?;",user_id_delteaccount)
     db_user.query("DELETE FROM debt WHERE user_id = ?;",user_id_delteaccount)
     db_user.query("DELETE FROM history WHERE fromwho = ?;",user_id_delteaccount)
     db_user.query("DELETE FROM payee WHERE user_id = ?;",user_id_delteaccount)
     db_user.query("DELETE FROM subscription WHERE user_id = ?;",user_id_delteaccount)
 })

module.exports = router
