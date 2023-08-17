const jwt = require('jsonwebtoken')

exports.blacklistedTokens = [];

exports.verifyToken = (req,res, next)=>{
    req.user = {username:null, verified:false}
    const privateKey  = "gersGarage";
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader ==='undefined') return res.sendStatus(403);

    const bearerToken = bearerHeader.split(' ')[1]

    jwt.verify(bearerToken, privateKey, function (err, data) {
        if (!(err && typeof data === 'undefined')) {
            req.user = {username: data.username, verified: true}
            next()
        }
    })
}