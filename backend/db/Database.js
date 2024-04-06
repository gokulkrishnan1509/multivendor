const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.LOCAL_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data)=>{
    console.log(`${data.connection.host}`)
  }).catch((err)=>{
    console.log("connection error")
  })

};

module.exports = connectDatabase;
