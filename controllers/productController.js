const productController = require("express").Router();

const Product = require("../models/Products");

const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");


//get all

productController.get('/', verifyToken, async(req,res)=>{
    try {
        const product = await Product.find(req.query)
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
})

//get one

productController.get('/find/:id', verifyToken, async(req,res)=>{
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(!product){
            return  res.status(401).send('Product not found')
        }
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
})

//create product

productController.get('/', verifyTokenAdmin, async(req,res)=>{
    try {
        const newProduct = await Product.create({...req.body})
        return res.status(201).json(newProduct)
    } catch (error) {
        console.log(error);
    }
})


module.exports= productController