const jwt = require("jsonwebtoken")

module.exports =async (req, res, next) => {
try{
//if you recieve the token form client store it in headers
const token = req.headers.authorization
if(!token) {
    return res.status(401).json({
        message: "token required"
    })
}
//else verify the token is correct and that it has the write secret
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
        return res.status(401).json({
            message: "token invalid"
        })
    }

    //attach the decoded payload to the request so we can use the data later
     req.token = decoded
  //token has been verified
    next()
  })
}catch(err){
  next(err)
}
  
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
