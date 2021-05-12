//this is a middleware, we'll call this one to verify our rotes
const jwt = require('jsonwebtoken');
require('dotenv/config');

function verifyToken(req, res, next){

        const token = req.header('auth-token');

        if (!token) {
            return res.status(401).send('Unauthorized Access.');
        }

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();

        } catch (err) {
            res.status(400).send(err);
        }

};

module.exports = verifyToken;
