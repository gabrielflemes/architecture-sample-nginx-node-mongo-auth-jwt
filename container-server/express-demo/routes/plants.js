const Joi = require('joi'); //this require must be before express 
const express = require('express');
const router = express.Router();
const Plant = require('../models/plant.schema.js');
const verifyToken = require('../auth/verifyToken.js');


//GET ALL
router.get('/', verifyToken, async (req, res) => {

    try {
        const plants = await Plant.find();
        console.log('plant test');
        res.send(plants);
    } catch (err) {
        res.status(500).send(err);
    }

});

//GET BY ID
router.get('/:id', verifyToken, async (req, res) => {

    try {
        const id = req.params.id;
        const plant = await Plant.findById(id);

        if (!plant) {
            res.status(404).send('plant not found');
            return;
        }

        res.send(plant);

    } catch (err) {
        res.status(500).send(err);
    }

});

//GET BY NAME
router.get('/name/:name', verifyToken, async (req, res) => {

    try {
        const name = req.params.name;
        const plants = await Plant.find({ name: name }).exec();

        if (!plants || plants.length == 0) {
            res.status(404).send('plants not found');
            return;
        }

        res.send(plants);

    } catch (err) {
        res.status(500).send(err);
    }

});

//CREATE
router.post('/', verifyToken, async (req, res) => {

    const validateResult = validateUser(req.body);
    if (validateResult.error) {
        res.status(400).send(validateResult.error.details[0].message);
        return;
    }

    const plant = new Plant({
        name: req.body.name,
        description: req.body.description,
        img: req.body.img
    });

    try {
        const savedPlant = await plant.save();
        res.send(savedPlant);
    } catch (err) {
        res.status(500).send(err);
    }


});


//UPDATE
router.put('/:id', verifyToken, async (req, res) => {

    try {
        
        const validateResult = validateUser(req.body);
        if (validateResult.error) {
            res.status(400).send(validateResult.error.details[0].message);
            return;
        }

        const id = req.params.id;

        const name = req.body.name;
        const description = req.body.description;
        const img = req.body.img;

        const updatedPlant = await Plant.updateOne({_id: id}, { $set: {name: name, description: description, img: img}});

        if (updatedPlant.n == 0) {
            res.status(404).send('plant not found');
            return;
        }

        res.send(updatedPlant);

       
    } catch (err) {
        res.status(500).send(err);
    }


});


//DELETE
router.delete('/:id', verifyToken, async (req, res) => {

    try {

        const id = req.params.id;
        const removedPlant = await Plant.remove({ _id: id });

        if (removedPlant.deletedCount == 0) {
            res.status(404).send('plant not found');
            return;
        }

        res.send(removedPlant);

    } catch (err) {
        res.status(500).send(err);
    }

});

function validateUser(body) {

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).required()
    });

    return schema.validate(body);
}




//now we have to export this router
module.exports = router;