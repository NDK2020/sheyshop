const express = require("express");
import mongoose from "mongoose";
import productModel from "../models/product.model";
const Product = require("../models/product.model")


const router = express.Router();
router.get(`/getallproducts`, (req: any,res: any) => {
  // can use Product.find() too
  //console.log("Product.find");
  productModel.find({},  (err, docs):any => {
    if(!err) {
      //return res.json({data: docs });
      // the above cmd return json{data: [data], the below return
      // the array [data] directly 
      return res.send(docs);  
    } else {
      return res.status(400).json({message: 'Something went wrong'});
    }  
  })  
});

router.post("/getproductbyid", (req: any, res: any) => {
  console.log("getbyid :", req.body.productId);
  productModel.find({_id: req.body.productId}, (err, docs) => {
    if (!err) {
      return res.send(docs[0]);
    } else {
      return res.status(400).json({message: "Something went wrong"});
    }  
  })
})

router.post("/addproduct", (req: any, res: any) => {

  // productModel.find({_id: req.body.productId}, (err, docs) => {
  //   if (!err) {
  //     return res.send(docs[0]);
  //   } else {
  //     return res.status(400).json({message: "Something went wrong"});
  //   }  
  // })

  const product = req.body;
  console.log(product);
  const newProduct = new productModel({
    name: product.name,
    price: product.price,
    countInStock: product.countInStock,
    image: product.image,
    description: product.description,
    category: product.category
  })

  newProduct._id = new mongoose.Types.ObjectId();

  newProduct.save ((err: any) => {
    console.log(err);
    if (err) 
      return res.status(400).json({message: "something went wrong"});
    else 
      return res.send("add new product successfully");
  });
})

router.post("/addproductreview", async (req: any, res:any) => {
  const {review, productid, currentUser} = req.body;
  const product = await productModel.findById({_id: productid});

  const reviewModel = {
    name: currentUser.name,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment, 
  }

  var rating = product!.reviews.reduce((accumulator: number, currentVal: any) => {
    return accumulator + currentVal.rating;  
  }, reviewModel.rating) ;
  // console.log(rating);
  // console.log(product!.reviews.length);
  rating /=  (product!.reviews.length + 1);

  product!.rating = rating;
  // console.log(rating);
  // console.log(reviewModel);

  product!.reviews.push(reviewModel)

  product!.save (err => {
    if (err) {
      return res.status(400).json({message: "something went wrong"})
    } else {
      res.send("Review submitted sucessfully");
    }
  })
});

router.post("/deleteproduct", (req: any, res: any) => {
  console.log(req.body.productid);

  productModel.findByIdAndRemove(req.body.productid, {}, err => {

    if (err)
      return res.status(400).json({ message: "something went wrong"});
    else
      return res.send("Product deleted successfully");

  });
});

router.post("/editproduct", (req: any, res: any) => {
  const product = req.body;
  productModel.findByIdAndUpdate(product._id, {
    name         : product.name,
    price        : product.price,
    countInStock : product.countInStock,
    image        : product.image,
    description  : product.description,
    category     : product.category
  }, (err: any) => {
    if (!err) {
      res.send("Update Product Info successful");
    } else {
      res.send("Something went wrong");
    }
  }) 
});

module.exports = router;
