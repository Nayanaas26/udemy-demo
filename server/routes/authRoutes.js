const express = require('express');
const router = express.Router();
const { signup, login, seed } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/seed', seed);


module.exports = router;
