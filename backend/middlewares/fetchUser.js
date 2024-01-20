var jwt = require('jsonwebtoken');
const jwt_secret = 'secretsignavi';

const fetchUser = (req, res, next) => {
    //get userId from JWT Token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        req.status(401).send({ error: "please enter correct credentials 1st" })
    }
    try {
        console.log("in try block");
        const data = jwt.verify(token, jwt_secret);
        console.log(data)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "please enter correct credentials 2nd" })
    }

}

module.exports = fetchUser;