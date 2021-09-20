import mongoose , {model, Schema, ObjectId} from "mongoose";

interface user {
  _id: ObjectId; 
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

const userSchema = new Schema<user> ({
  _id: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  isAdmin: {type: Boolean, require: true, default: false},
});

const userModel = mongoose.model("users", userSchema)

export default userModel;
