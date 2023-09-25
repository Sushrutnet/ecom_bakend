const uploadController = require("express").Router()

const multer = require('multer')

const  { verifyToken} = require('../middlewares/verifyTokens')
const { json } = require("express")

const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null, 'public/images')
    },
    filename:( req ,file ,cb) =>{
        cb(null , req.body.filename)
    }
})

const upload = multer({
    storage
})

uploadController.post('/images', verifyToken, upload.single('image'), (req,res)=>{
    try {
        return res.status(200).json({msg: "successfully upload file"})
    } catch (error) {
        console.log(error.massage);
    }
})

module.exports= uploadController