const express = require("express")
const app = express();
const PORT = 3005;

const accountRoute = require("./api/AccountApi")
const emailRoute = require("./api/EmailApi")
const functionRoute = require("./api/FunctionApi")
const profileRoute = require("./api/ProfileApi")

app.use("/account", accountRoute)
app.use("/email", emailRoute)
app.use("/function", functionRoute)
app.use("/profile", profileRoute)


app.get("/", (req, res) =>{
    res.send("<h1>PIGGYBANK's Backend Site</h1>")
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server running on ${PORT}`)
})