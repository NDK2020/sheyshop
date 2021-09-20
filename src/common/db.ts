import mongoose, {ConnectOptions} from "mongoose";


var mongodbURL:string ="mongodb+srv://ndkhoa2020:qweasd@cluster0.3chvi.mongodb.net/mern-ecommerce"

mongoose.connect(mongodbURL!, {
  useUnifiedTopology: true,
  useNewUrlParser:true,
} as ConnectOptions)

var dbconnect = mongoose.connection;

dbconnect.on('error', () => {
  console.log(`Mongo DB connection Failed`)
})

dbconnect.on('connected', () => {
  console.log(`Mongodb connection successful`)
})

module.exports = mongoose;
