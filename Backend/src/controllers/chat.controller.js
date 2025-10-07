const chatModel = require('../models/chat.model');
const messageModel = require('../models/message.model');

async function createChat(req, res) {
    try {
        const {title} = req.body;
        const user = req.user;

        const chat = await chatModel.create({
            user: user._id,
            title: title
        })

        res.status(200).json({
            message:"Chat created successfully!",
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating chat",
            error: error.message
        })
    }
}

async function getUserChats(req, res) {
    try {
        const user = req.user;
        
        const chats = await chatModel.find({
            user: user._id
        }).sort({ lastActivity: -1 });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching chats",
            error: error.message
        })
    }
}

async function getChatMessages(req, res) {
    try {
        const { chatId } = req.params;
        const user = req.user;

        // Verify chat belongs to user
        const chat = await chatModel.findOne({
            _id: chatId,
            user: user._id
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        const messages = await messageModel.find({
            chat: chatId
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching messages",
            error: error.message
        })
    }
}

module.exports = {
    createChat,
    getUserChats,
    getChatMessages
};