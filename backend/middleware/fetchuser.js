const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ShreyIsAwesome'

const fetchuser = (req,res,next) =>{
    // Get the token from the header 
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send('Access denied. Please authenticate using a valid token')
    }
    try {
        const string = jwt.verify(token,JWT_SECRET)
        console.log(string)
        console.log(req.user)
        req.user = string.user
        next()
    } catch (error) {
        res.sendStatus(401).status('Internal server error')
    }
}

module.exports = fetchuser