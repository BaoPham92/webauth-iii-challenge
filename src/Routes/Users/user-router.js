const router = require('express').Router();
const Users = require("./user-model.js");
const auth = require('../Auth/authorization');

const checkingRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.decodedJWT.roles)) {
            next();
        } else {
            res.status(403).json({ message: "No current role included" });
        }
    };
}

router.get('/', auth, checkingRole(["student", "admin"]), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})

module.exports = router;