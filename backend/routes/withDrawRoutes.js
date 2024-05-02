module.exports =()=>{
    const router = require("express").Router();
    const {isSeller} = require("../utils/auth")

    const WithdrawController = require("../controller/withdrawController")
    const {createWithDraw} = new WithdrawController()

    router.route("/create-withdraw").post(isSeller,createWithDraw)

    app.use("/api/withdraw",router)

}