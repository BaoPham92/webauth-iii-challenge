const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('../Users/user-model');

router.post('/register', (req, res) => {
    let user = req.body;

    if (
        (!!user.username === true && !!user.password === true)
        &&
        (user.username.length > 2 && user.password.length > 3)
    ) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(newUser => res.status(201).json(newUser))
            .catch(error => res.status(500).json(error))
    } else {
        res.status(400).json({
            message: "Invalid information about the user"
        });
    }
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user.username);
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => res.status(500).json(error))
})

module.exports = router;

const generateToken = (username) => jwt.sign({
    username,
    roles: "student"
}, process.env.JWT_SECRET, {
    expiresIn: '24 hours'
})