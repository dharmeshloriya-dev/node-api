const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

router.post('/login', (req, res) => {
    if (!req.body.email) {
        res.status('500').send('Email required!')
    }
    if (!req.body.password) {
        res.status('500').send('Password required!')
    }
    res.status('201').send(`Logged in successfully!`)
});

// Register User
router.post('/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(result => {
        console.log('res ', res);
        res.status('201').json({
            message: 'User saved successfully',
            data: result
        })
    }).catch(err => {
        res.status('500').json({
            message: 'Internal server error',
            data: err
        })
    })
});

// Update User
router.post('/user/:userId', (req, res, next) => {
    const updateOps = {}
    const id = req.params.userId
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    User.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status('201').json({
                message: 'User updated successfully',
                data: result
            })
        })
        .catch(err => {
            res.status('500').json({
                message: 'Internal server error',
                data: err
            })
        })
});

// Delete User
router.delete('/user/:userId', (req, res, next) => {
    const id = req.params.userId

    User.remove({_id: id})
        .exec()
        .then(result => {
            res.status('201').json({
                message: 'User deleted successfully',
                data: result
            })
        })
        .catch(err => {
            res.status('500').json({
                message: 'Internal server error',
                data: err
            })
        })
});

// Get all Users
router.get('/users', (req, res, next) => {
    console.log('get all userts');
    User.find()
        .exec()
        .then(docs => {
            res.status('201').json({
                message: 'Got all users successfully',
                data: docs
            })
        })
        .catch(err => {
            res.status('500').json({
                message: 'Internal server error',
                data: err
            })
        })
});

module.exports = router