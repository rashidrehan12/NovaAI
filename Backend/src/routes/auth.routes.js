const express = require('express');
const authControllers = require('../controllers/auth.controller');

const router = express.Router();

console.log('Auth routes file loaded!');

// GET endpoint to show available auth endpoints
router.get('/', (req, res) => {
    console.log('Auth GET / route hit!');
    res.json({
        message: "Auth API endpoints",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login"
        },
        status: "success"
    });
});

router.post('/register', authControllers.registerController);

router.post('/login', authControllers.loginController)


module.exports = router;