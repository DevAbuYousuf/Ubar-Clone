const express = require('express');
const router = express.Router();
const {body}= require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('fullName.firstName').isLength({ min: 3, max: 30 }).withMessage('First name must be between 3 and 30 characters long'),
    body('fullName.lastName').isLength({ min: 3, max: 30 }).withMessage('Last name must be between 3 and 30 characters long')
],
userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], userController.loginUser);

module.exports = router;