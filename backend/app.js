const express = require("express");
const app = express();
const globalErroHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path")
// **********************third party Middleware's ************************
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());

app.use(
  cors(
    
    {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, 
  }
  
  
  )
);

app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

require("./routes/userRouter")(app);
require("./routes/uploadFilesRouter")(app);
require("./routes/shopRouter")(app)
require("./routes/productRoute")(app);
require("./routes/eventRoutes")(app)
require("./routes/couponRoutes")(app)
require("./routes/orderRoutes")(app)
require("./routes/conversationRoutes")(app)
require("./routes/messagesRoutes")(app)
require("./routes/withDrawRoutes")(app)
// It's for ErrorHandling
app.use(globalErroHandler);
module.exports = app;
