const express = require("express");
//import {loadEnv} from "./src/common/envLoader"
//import bodyParser from "body-parser"
//import cors from "cors";
var loadEnv = require("./src/common/envLoader")
const bodyParser = require("body-parser");
const cors = require("cors");
var dbConnection = require('./src/common/db');
//import router as productRoute from "./routes/product.route";
var productRoute = require("./src/routes/product.route");
var userRoute = require("./src/routes/user.route");
var ordersRoute = require("./src/routes/orders.router");
const path = require("path");
var favicon = require("serve-favicon");

loadEnv();

const app = express();
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));
app.use(express.text());

app.use(cors());
app.use( cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "https://practice-sheyshop.herokuapp.com"],
    //origin: process.env.CLIENT_URL
  })
);
console.log("client url", process.env.CLIENT_URL);


//app.use(express.static('client/public'))
// app.get("/", (req: any, res: any) => {
//   res.send(
//     "<h1> This message is from back end </h1>"
//   )
// })
//app.use(favicon(path.join(__dirname, './client/build', 'favicon.ico')));
app.use('/api/products/', productRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute);

  
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION MODE ACTIVE");
  //app.use('/', express.static("/client/build"));
  app.use(express.static("./client/build"));
  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, './client/build','index.html'));
  })
}

const port = process.env.PORT || 8000;
app.set("port", port);
// console.log(port);

app.listen(port, function() {
    console.log(`Server run on port ${process.env.SERVER_PORT}`)
})
