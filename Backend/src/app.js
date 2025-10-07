const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://novaai-35p8.onrender.com', 'https://novaai-frontend.onrender.com', 'https://novaai-1-93pi.onrender.com'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Root route for health check
app.get('/', (req, res) => {
    res.json({
        message: "Nova AI Backend is running!",
        status: "success",
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: "/api/auth",
            chat: "/api/chat"
        }
    });
});

//using routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Debug route to test if routing works
app.get('/api/test', (req, res) => {
    res.json({
        message: "Test route working!",
        status: "success"
    });
});

module.exports = app;