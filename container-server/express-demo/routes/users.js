const express = require('express');
const router = express.Router();
const User = require('../models/user.schema.js');
const Validation = require('../validation.js');
const bcrypt = require('bcryptjs');
const verifyToken = require('../auth/verifyToken.js');


//MIDDLEWARES - it'll be executed when a URL be hit
//we will use to authenticate or something like that
// app.use('/api/users/', () => {
//     console.log('this route was hit - exemple of middleware');
// });
//app.use(auth);




//GET ALL
router.get('/', verifyToken, async (req, res) => {

    try {
        const users = await User.find();
        //console.log(req.user); req.user countain all information that is carried on ther token
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }

});

//GET BY ID
router.get('/:id', verifyToken, async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).send('user not found');
            return;
        }

        res.send(user);

    } catch (err) {
        res.status(500).send(err);
    }

});

//GET BY NAME
router.get('/name/:name', verifyToken, async (req, res) => {

    try {
        const name = req.params.name;
        const users = await User.find({ name: name }).exec();

        if (!users || users.length == 0) {
            res.status(404).send('users not found');
            return;
        }

        res.send(users);

    } catch (err) {
        res.status(500).send(err);
    }

});

//CREATE
router.post('/', async (req, res) => {

    //Validation without 'joi'
    //you have to do that for each field
    // if (!req.body.name || req.body.name < 3 ) {
    //     //400 Bad Request
    //     res.status(400).send('Name is required and should have at least 3 characters');
    //     return;
    // }

    //validate with joi
    //if invalid, return 400 - Bad Request
    const validateResult = Validation.userRegisterValidation(req.body);
    if (validateResult.error) {
        res.status(400).send(validateResult.error.details[0].message);
        return;
    }

    //check if the email already exists in DB
    const userExist = await User.findOne({ email: req.body.email }).exec();
    if (userExist) {
        return res.status(400).send('User already exists.');
    }


    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create obj to push into array
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });



    //save and return my new obj if success, otherwise return error caught in err
    // const savedUser = await user.save().then(data => {
    //     console.log('passou');
    //     res.send(data);
    // }).catch(err => {
    //     console.log(err);
    //     res.status(500).send(err);
    // });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (err) {
        res.status(500).send(err);
    }


});


//UPDATE
router.put('/:id', verifyToken, async (req, res) => {

    try {
        
        //validate with joi
        //if invalid, return 400 - Bad Request
        const validateResult = Validation.userRegisterValidation(req.body);
        if (validateResult.error) {
            res.status(400).send(validateResult.error.details[0].message);
            return;
        }

        //look up the user
        //if not exist return 404
        const id = req.params.id;

        const name = req.body.name;
        const email = req.body.email;

        const updatedUser = await User.updateOne({_id: id}, { $set: {name: name, email: email}});

        if (updatedUser.n == 0) {
            res.status(404).send('user not found');
            return;
        }

        res.send(updatedUser);

       
    } catch (err) {
        res.status(500).send(err);
    }


});


//DELETE
router.delete('/:id', verifyToken, async (req, res) => {

    try {
        //look up the user
        //if not exist return 404
        const id = req.params.id;
        const removedUser = await User.remove({ _id: id });
        console.log(removedUser);

        if (removedUser.deletedCount == 0) {
            res.status(404).send('user not found');
            return;
        }

        res.send(removedUser);

    } catch (err) {
        res.status(500).send(err);
    }

});







//now we have to export this router
module.exports = router;