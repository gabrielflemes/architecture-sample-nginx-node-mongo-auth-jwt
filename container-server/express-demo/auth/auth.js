const router = require('express').Router();
const User = require('../models/user.schema.js');
const Validation = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

router.post('/login', async (req, res) => {
 
    const validateResult = Validation.loginValidation(req.body);

    if (validateResult.error) {
        return res.status(400).send(validateResult.error.details[0].message);
    }


    //check if the email exists
    const userExist = await User.findOne({ email: req.body.email }).exec();
    if (!userExist) {
        return res.status(400).send('Email is wrong.');
    }

    //correct password
    const validPassword = await bcrypt.compare(req.body.password, userExist.password);
    if (!validPassword) {
        return res.status(400).send('Invalid Password.');
    }

    //create and assign a token
    const token = jwt.sign({id: userExist._id, name: userExist.name, email: userExist.email, roles: ['admin', 'guest']}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
        token: token,        
        user: {
            email: userExist.email,
            name: userExist.name,
            id: userExist._id
        }
    });

});


module.exports = router;