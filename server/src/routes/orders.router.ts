import express from "express";
import mongoose from "mongoose";
import {v4 as uuidv4}from "uuid";
import orderModel from "../models/order.model";
const stripe = require("stripe")("sk_test_51JZcxfDQPjJJlnSb0CTQwFXRlWrFa62VGVHHw32UdIr3zTM8BOAZlizNCwxfzpDsggNMs87MuDkJ4HVMhQ0eJNQ4008jZ6LhE2");
const router = express.Router(); 

router.post("/placeorders", async (req, res) => {
  const {token, subTotal, currentUser, orderItems} = req.body;  
  const customer = await stripe.customers.create({
    email:  token.email,
    source: token.id
  }) 

  const payment = await stripe.charges.create({
    amount: subTotal * 100,
    currency: "inr",
    customer: customer.id,
    receipt_email: token.email
  }, {
    idempotencyKey: uuidv4(), // unique id for every payment  
  })

  //check payment successful or not
  // console.log("*********");
  // console.log(currentUser);
  // console.log("*********");
  // console.log(orderItems);
  if (Object.keys(payment).length) {
    
    const order = new orderModel ({
      userid     : currentUser._id,
      name       : currentUser.name,
      email      : currentUser.email,
      orderItems : orderItems,
      shippingAddress: {
        address    : token.card.address_line1,
        city       : token.card.address_city,
        country    : token.card.address_country,
        postalCode : token.card.address_zip,
      },
      orderAmount   : subTotal,
      transactionId : payment.source.id,
      isDelivered   : false,
    })
    order._id = new mongoose.Types.ObjectId();

    order.save((err: any) => {
      console.log(err);
      if (!err)
        return res.send("Order placed sucessfully");
      else
        return res.status(400).json({ message: "something went wrong" });
    })
    
  } else {
    return res.status(400).json({message: "Payment failed"});
  }
  
});

router.post("/getordersbyuserid", (req, res) => {

  orderModel.find({userid: req.body.userid}, (err, docs) => {
    if (err ) {
      return res.status(400).json({message: "something went wrong"});
    } else {
      res.send(docs);
    }  
  });  

});

router.post("/getorderbyid", (req, res) => {

  orderModel.find({_id: req.body.orderid}, (err, docs) => {
    if (err ) {
      return res.status(400).json({message: "something went wrong"});
    } else {
      res.send(docs[0]);
    }  
  });  

});

router.get("/getallorders", (req, res) => {
  orderModel.find({}, (err, docs) => {
    if (err ) {
      return res.status(400).json({message: "something went wrong"});
    } else {
      res.send(docs);
    }  
  });
});

module.exports = router;

