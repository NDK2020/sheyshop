import express from "express";
import {loadEnv} from "./common/envLoader"
import bodyParser from "body-parser"
import cors from "cors";
var dbConnection = require('./common/db');
//import router as productRoute from "./routes/product.route";
var productRoute = require("./routes/product.route");
var userRoute = require("./routes/user.route");
var ordersRoute = require("./routes/orders.router");
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

app.get("/", (req, res) => {
  res.send("this is from backend")
})

app.use('/api/products/', productRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use('/', express.static('/../../client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname), 'client/build/index.html'));
//   })
  
// }

// const port = process.env.PORT || 8000;
// console.log(port);

app.listen(process.env.SERVER_PORT, function() {
    console.log(`Server run on port ${process.env.SERVER_PORT}`)
})
