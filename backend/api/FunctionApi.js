//3004
//.env
require('dotenv').config();
const dbpassword = process.env.DBPASSWORD
const dbuser = process.env.DBUSER

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
    host: "localhost",
    password: dbpassword,
    database: "user"
});

//transfer
router.post("/transfer", (req, res) =>{
    const transfer_payeeID = req.body.transfer_payeeID
    const transfer_payerID = req.body.transfer_payerID
    const transfer_amount = req.body.transfer_amount

    db_user.query("UPDATE user SET balance = balance + ? WHERE user_id = ?;",
    [transfer_amount, transfer_payeeID])
    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [transfer_amount, transfer_payerID])
})

//withdrawal
router.post("/withdrawal", (req, res) =>{
    const withdrawal_userid = req.body.withdrawal_userid
    const withdrawal_amount = req.body.withdrawal_amount

    db_user.query("UPDATE user SET balance = balance - ? WHERE user_id = ?;",
    [withdrawal_amount, withdrawal_userid])
})

//deposit
router.post("/deposit", (req, res) =>{
    const deposit_userid = req.body.deposit_userid
    const deposit_amount = req.body.deposit_amount

    db_user.query("UPDATE user SET balance = balance + ? WHERE user_id = ?;",
    [deposit_amount, deposit_userid])
})

module.exports = router