import express from "express";
import userModel from "../models/user.model"
import mongoose from "mongoose";

const router = express.Router(); 

router.post("/register", (req, res) => {
  userModel.find({email: req.body.email}, async (err, docs) => {
    if (docs.length > 0) {
      return res.status(400).json({ message: "User already registered"});
    } else {
      const newuser = await new userModel(req.body)
      newuser._id = new mongoose.Types.ObjectId();
      newuser.save((err: any) => {
        if (!err) {
          res.send("User Registration successful")
        } else {
          res.send("Something went wrong")
        }
      })
    }

    if (err) {
      res.status(400).json({message: "Something went wrong"})
    }
  })
});

router.post("/login", (req, res) => {
  userModel.find({email: req.body.email, passowrd: req.body.password}, (err, docs) => {
    if (docs.length > 0) {
      const user = {
        _id: docs[0]._id,
        name: docs[0].name,
        email: docs[0].email
      }
      res.send(docs[0]);
    } else {
      return res.status(400).json({message: "Invalid Credentials"})
    }  
  })
});

router.post("/update", (req, res) => {
  console.log(req.body);

  userModel.findByIdAndUpdate(req.body._id, {
    name : req.body.name,
    email: req.body.email,
    password: req.body.password,
  }, (err: any) => {
    if (!err) {
      res.send("Update User Info successful");
    } else {
      res.send("Something went wrong");
    }
  })
});

router.post("/deleteuser", (req, res) => {
  console.log(req.body.userid);

  userModel.findByIdAndRemove(req.body.userid, {}, err => {
    
    if (err)
      return res.status(400).json({ message: "something went wrong"});
    else
      return res.send("User deleted successfully");
    
  });
});

router.get("/getallusers", (req, res) => {
  userModel.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({message: "something went wrong"});
    } else {
      return res.send(docs)
    }
  });
});
  

module.exports = router;

