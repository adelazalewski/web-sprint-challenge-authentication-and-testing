const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const users = require("../auth/auth-model")

function validateRegistration() {
    return async (req, res, next) => {
try{
    const {username, password} = req.body
    //check if user exsists
    const user = await users.findByUsername(username)
    if(user) {
        return res.status(409).json({
            message: "username already taken"
        })
    }else if(!password || !username){
return res.status(400).json({
    message: "username and password required"
})
    }else{
        next()
    }
}catch(err){
    next(err)
}
    }
}
function validateUser() {
    return async (req, res, next) => {
    try{
        const {username, password} = req.body
        const user = await users.findByUsername(username)
        const passwordValid = await bcrypt.compare(password, user.password)
        
if(!username || !password){
    return res.status(400).json({
        message: "username and password required"
    })
}
else if(!user || !passwordValid){
    return res.status(401).json({
        message: "invalid credentials"
    })
}else{
    next()
}
}catch(err){
            next(err)
        }
}
}

function signToken() {
    return async (req, res, next) => {
        try{
        const {username} = req.body
        const user = await users.findByUsername(username)

        const token = jwt.sign({
            //this is the payload objet of the token === the data that we want encrypted in the token
            userID: user.id,
        }, process.env.JWT_SECRET || "adelas spint challenge")
        
        req.token = token
        //console.log(req)
        next()
    }catch(err){
            next(err)
        }
    }
}
module.exports = {
    validateUser,
    signToken,
    validateRegistration
}