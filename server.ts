import express from "express";
import {loadEnv} from "./src/common/envLoader"
import bodyParser from "body-parser"
import cors from "cors";
var dbConnection = require('./src/common/db');
//import router as productRoute from "./routes/product.route";
var productRoute = require("./src/routes/product.route");
var userRoute = require("./src/routes/user.route");
var ordersRoute = require("./src/routes/orders.router");
const path = require("path");

loadEnv();

const app = express();
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));
app.use(express.text());

app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
console.log("client url", process.env.CLIENT_URL);

if (process.env.NODE_ENV === "production") {
  app.use('/', express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/', 'index.html'));
  })
}

app.get("/", (req, res) => {
  res.send("this is from backend")
})

app.use('/api/products/', productRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute);

  

const port = process.env.PORT || process.env.SERVER_PORT;
// console.log(port);

app.listen(port, function() {
    console.log(`Server run on port ${process.env.SERVER_PORT}`)
})
