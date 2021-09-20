import mongoose, {model, Schema, ObjectId} from "mongoose";

//create a interface representing a document in mongoDB

interface product {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  reviews: [reviews];
}

interface reviews {
  userid: ObjectId;
  name: string;
  comment: string;
  rating: number;
}

const reviewsSchema = new Schema<reviews> ({
 userid: { type: mongoose.Schema.Types.ObjectId }, 
 name: {type: String, require: true},
 comment: {type: String},
 rating: {type: Number, require: true},
},{timestamps: true});

// create a schema corresponding to the document interface
const productSchema = new Schema<product>({
  name: { type: String, require: true },
  image: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: false },
  countInStock: { type: Number, require: false },
  rating: { type: Number, require: false },
  reviews: [reviewsSchema]
  //review: {type: [], require: true},
}, {timestamps: true});


// create a model
const productModel = model<product>("Product", productSchema);

export default productModel;
module.exports = productModel;

