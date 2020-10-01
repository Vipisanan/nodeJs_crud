const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongodb = require('mongodb');


//save data
router.post('/' , async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
        const data = await user.save()
        res.json(data)
    }catch (err) {
        res.send("Error" + err)
    }
})

//get all

router.get('/' , async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }catch (err) {
        res.send('Error' + err);
    }
})

module.exports = router
