const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller')

const router = express.Router();

// Info endpoint (no auth required)
router.get('/info', (req, res) => {
    res.json({
        message: "Chat API endpoints",
        endpoints: {
            "get_chats": "GET /api/chat/ (requires auth)",
            "create_chat": "POST /api/chat/ (requires auth)",
            "get_messages": "GET /api/chat/:chatId/messages (requires auth)"
        },
        status: "success",
        note: "All endpoints except /info require authentication"
    });
});

// Get all chats for user
router.get('/', authMiddleware.authUser, chatController.getUserChats);

// Create new chat
router.post('/', authMiddleware.authUser, chatController.createChat);

// Get messages for a specific chat
router.get('/:chatId/messages', authMiddleware.authUser, chatController.getChatMessages);

module.exports = router;