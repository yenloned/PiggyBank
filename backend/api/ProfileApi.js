//3003
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

//app use
const router = express.Router()
router.use(express.json());
router.use(cors({
    origin: ["https://piggybank-web.netlify.app/"],
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


//get all info
router.post("/get_info", (req,res) => {
    const searchingID = req.body.searchingID

    db_user.query("SELECT * FROM user WHERE user_id = ?;",
    searchingID, (err, result) => {
        res.send(result)
    })
})

//get history
router.post("/get_history", (req, res) =>{
    const searchingID = req.body.searchingID

    //descending order by reference number, which display as First In Last Out
    db_user.query("SELECT * FROM history WHERE fromwho = ? OR towho = ? ORDER BY ref DESC;",
    [searchingID, searchingID], (err, result) =>{
        res.send(result)
    })
})

//get subscription
router.post("/get_sub", (req, res) =>{
    const searchingID = req.body.searchingID

    db_user.query("SELECT * FROM subscription WHERE user_id = ? ORDER BY ref DESC;",
    searchingID, (err, result) => {
        res.send(result)
    })
})

//check subscription existed
router.post("/check_sub", (req, res) =>{
    const searchingID = req.body.searchingID

    db_user.query("SELECT plan FROM subscription WHERE user_id = ?;",
    searchingID, (err, result) => {
        res.send(result)
    })
})

//get debt
router.post("/get_debt", (req,res) => {
    const searchingID = req.body.searchingID

    db_user.query("SELECT * FROM debt WHERE user_id = ?;",
    searchingID, (err,result) => {
        res.send(result)
    })
})

//get payee info
router.post("/get_payee", (req, res) =>{
    const searchingID = req.body.searchingID

    db_user.query("SELECT payee_id, payee_name FROM payee WHERE user_id = ?;",
    searchingID, (err, result) =>{
        res.send(result)
    })
})

//check payee registered
router.post("/check_payee", (req, res) =>{
    const user_id_checkpayee = req.body.user_id_checkpayee
    const check_payee_id = req.body.check_payee_id

    db_user.query("SELECT payee_id FROM payee WHERE (user_id = ?) AND (payee_id = ?);",
    [user_id_checkpayee, check_payee_id], (err, result) =>{
        res.send(result)
    })
})

//add payee
router.post("/add_payee", (req,res) =>{
    const user_id_addpayee = req.body.user_id_addpayee
    const add_payee_id = req.body.add_payee_id
    const add_payee_name = req.body.add_payee_name

    db_user.query("INSERT INTO payee (user_id, payee_id, payee_name) VALUES (?,?,?);",
    [user_id_addpayee, add_payee_id, add_payee_name])
})

//delete payee
router.post("/delete_payee", (req, res) =>{
    const user_id_deletepayee = req.body.user_id_deletepayee
    const payee_id = req.body.payee_id

    db_user.query("DELETE FROM payee WHERE `payee_id` = ? AND `user_id` = ?;",
    [payee_id, user_id_deletepayee], (err, result) =>{
        res.send(result)
    })
})

//check user existed
router.post("/check_user", (req, res) =>{
    const payee_id_checkuser = req.body.payee_id_checkuser

    db_user.query("SELECT user_id FROM user WHERE user_id = ?;",
    payee_id_checkuser, (err,result) =>{
        res.send(result)
    })
    
})

//enable 2FA
router.post("/enable_2FA", (req, res) => {
    const user_id_enable2FA = req.body.user_id_enable2FA
    db_user.query("UPDATE user SET `2FA` = 1 WHERE user_id = ?;", user_id_enable2FA)
})

//disable 2FA
router.post("/disable_2FA", (req, res) => {
    const user_id_disable2FA = req.body.user_id_disable2FA
    db_user.query("UPDATE user SET `2FA` = 0 WHERE user_id = ?;", user_id_disable2FA)
})

//check balance
router.post("/check_balance", (req, res) => {
    const user_id_checkbalance = req.body.payerID
    const checked_balance = req.body.check_amount
    db_user.query("SELECT balance FROM user WHERE user_id = ? AND balance >= ?;",
    [user_id_checkbalance, checked_balance], (err, result) => {
        if (err){
            return
        }else{
            res.send(result)
        }
    })
})

module.exports = router