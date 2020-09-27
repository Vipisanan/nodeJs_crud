const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const mongodb = require('mongodb');


//get all the data from db
router.get("/", async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (err) {
        res.send("Error" + err)
    }
});
//save data
router.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub,
    })
    try {
        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.send("Error" + err)
    }
})

//find by id
router.get("/:id", async (req, res) => {
    try {
        const aliens = await Alien.findById(req.params.id)
        res.json(aliens)
    } catch (err) {
        res.send("Error" + err)
    }
});

//update
router.patch('/:id' , async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.send("Error" + err)
    }
})
//delete
router.delete('/:id' ,async (req, res) => {
    try{
        const alien = await Alien.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
        res.send("delete success " + alien.name);
    }catch (err) {
        res.send("Error" + err)
    }
})

module.exports = router
