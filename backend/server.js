
// Handling uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`ERROR:${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`)
})



const app = require("./app");
const connectDatabase = require("./db/Database");


// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config()
}

// connect db
connectDatabase()

// create server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
})


// unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`)

    server.close(()=>{
        process.exit(1);
    })
})