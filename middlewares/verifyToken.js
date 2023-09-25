const jwt = require('jsonwebtoken')

const verifyToken = (req , res) =>{
    if(!req.headers.authorization) return res.status(403).json({msg:"Not authorized"});

    if(req.headers.authorization && req.headers.authorization.startwith ("Bearer ")){
        const token = req.headers.split('')[1]
        jwt.verify(token , process.env.JWT_SECRET, (err , data)=>{
            if(err)  return res.status(403).json({msg: "Wrong Or Expired Token. "});
            else{
                req.user = data
                next()
            }
        })
    }
}

const verifyTokenAdmin = (req , res) =>{
    if(!req.headers.authorization) return res.status(403).json({msg:"Not authorized"});

    if(req.headers.authorization && req.headers.authorization.startwith ("Bearer ")){
        const token = req.headers.split('')[1]
        jwt.verify(token , process.env.JWT_SECRET, (err , data)=>{
            if(err)  return res.status(403).json({msg: "Wrong Or Expired Token. "});
            else{
                if(!data.isAdmin) return res.status(403).json({msg:"You are not admin"})
                req.user = data
                next()
            }
        })
    }
    
}



module.exports ={
    verifyToken,
    verifyTokenAdmin
}