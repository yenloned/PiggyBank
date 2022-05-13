//3004
//.env
require('dotenv').config();
const dbpassword = process.env.DBPASSWORD
const dbuser = process.env.DBUSER
const dbhost = process.env.DBHOST
const dbname = process.env.DBNAME

//api require
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//cookie require
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//router use
const router = express.Router()
router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true}));


//mysql connection
const db_user = mysql.createConnection({
    user: dbuser,
    host: dbhost,
    password: dbpassword,
    database: dbname
});

//transfer
router.post("/transfer", (req, res) =>{
    const transfer_payeeID = req.body.transfer_payeeID
    const transfer_payerID = req.body.transfer_payerID
    const transfer_amount = req.body.transfer_amount

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    //update balance for transfer (increase for payee, decrease for payer)
    db_user.query("UPDATE user SET balance = balance + ? WHERE user_id = ?;",
    [transfer_amount, transfer_payeeID])
    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [transfer_amount, transfer_payerID])

    //transaction history
    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [transfer_payerID, transfer_payeeID, "Transfer", transfer_amount, time])
})

//withdrawal
router.post("/withdrawal", (req, res) =>{
    const withdrawal_userid = req.body.withdrawal_userid
    const withdrawal_amount = req.body.withdrawal_amount

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    //update balance for withdrawal (decrease)
    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [withdrawal_amount, withdrawal_userid])
    //transaction history
    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [withdrawal_userid, withdrawal_userid, "Withdrawal", -withdrawal_amount, time])
})

//deposit
router.post("/deposit", (req, res) =>{
    const deposit_userid = req.body.deposit_userid
    const deposit_amount = req.body.deposit_amount

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    //update balance for deposit (increase)
    db_user.query("UPDATE user SET balance = balance + ? WHERE user_id = ?;",
    [deposit_amount, deposit_userid])
    //transaction history
    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [deposit_userid, deposit_userid, "Deposit", deposit_amount, time])
})

//loan
router.post("/loan", (req, res) =>{
    const loan_userid = req.body.loan_userid
    const loan_amount = req.body.amount
    const loan_tenor = req.body.tenor
    const loan_repay = req.body.repay

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    db_user.query("UPDATE user SET balance = balance + ? WHERE user_id = ?;",
    [loan_amount, loan_userid])

    db_user.query("INSERT INTO debt (user_id, total, monthly, tenor, type, date) VALUES (?,?,?,?,?,?);",
    [loan_userid, loan_repay*loan_tenor, loan_repay, loan_tenor, "Loan", time])

    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [loan_userid, loan_userid, "Loan", loan_amount, time])
})

//insurance
router.post("/insurance", (req, res) =>{
    const insurance_userid = req.body.insurance_userid
    const plan_name = req.body.plan_name
    const insurance_repay = req.body.insurance_repay
    const insurance_amount = req.body.insurance_amount

    //setting timezone
    let ts = Date.now();
    let time = new Date(ts).toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });

    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [insurance_repay, insurance_userid])

    db_user.query("INSERT INTO subscription (user_id, assure, repay, plan, type, date) VALUES (?,?,?,?);",
    [insurance_userid, insurance_amount, insurance_repay, plan_name, "Insurance", time])

    db_user.query("INSERT INTO history (fromwho, towho, type, amount, date) VALUES (?,?,?,?,?);",
    [insurance_userid, insurance_userid, "Subscription", insurance_repay, time])
})

module.exports = router