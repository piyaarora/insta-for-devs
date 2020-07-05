const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        res.status(422).json({ error: "please add all fields" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists" })

            }
            const user = new User({
                email,
                password,
                name
            })

            user.save()
                .then(user => {
                    res.json({ message: "user saved successfully" })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
    res.json({ message: "successfully posted" })
})

module.exports = router