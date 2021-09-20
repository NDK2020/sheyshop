import mongoose , {model, Schema, ObjectId} from "mongoose";

interface iOrder {
  _id             : ObjectId,
  userid          : string,
  name            : string,
  email           : string,
  orderItems      : Array<iItems>,
  shippingAddress : iAddress,
  orderAmount     : number,
  transactionId   : string,
  isDelivered     : boolean,
}

interface iItems {
  _id      : ObjectId,
  name     : string,
  quantity : number,
  price    : number,

}

interface iAddress {
  address    : string,
  city       : string,
  postalCode : number,
  country    : string
}

const orderSchema = new Schema<iOrder> ({
  _id    : {type: mongoose.Schema.Types.ObjectId},
  userid : {type: String, require: true},
  name   : {type: String, require: true},
  email  : {type: String, require: true},
  orderItems:[{
    _id      : {type: mongoose.Schema.Types.ObjectId},
    name     : {type: String, require: true},
    quantity : {type: Number, require: true},
    price    : {type: Number, require: true}
  }],
  shippingAddress: {
    address    : {type: String, require: true},
    city       : {type: String, require: true},
    postalCode : {type: Number, require: true},
    country    : {type: String, require: true},
  },
  orderAmount   : {type: Number, require: true},
  transactionId : {type:String, require: true},
  isDelivered   : {type: Boolean, require: true},
}, {
  timestamps: true,
});

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel;


