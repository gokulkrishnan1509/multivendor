
// const stripe = require("stripe")

// class Payment{

//     async  paymentProcess(req,res,next) {

//         const myPayment = await stripe.paymentIntents.create({
//             amount:req.body.amount,
//             currency:"inr",
//             metadata:{
//                 company:"Gokul"
//             }

//         })

//         res.status(201).json({success:true,client_secret:myPayment.client_secret})
        
//     }

//     async getStirpeKey (req,res,next){
//         res.status(200).json({stripeApiKey:'process'})
//     }
// }



// module.exports =Payment