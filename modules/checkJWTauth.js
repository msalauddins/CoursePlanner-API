const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET || 'secret');
        req.userData = decoded;
        next();
    } catch (err) {
        if (err.message == 'jwt expired') {
            return res.send('Token Expired!');
          }
          else{
            return res.send('Invalid Token!');
          }
        
    }
};