const { Server } = require("socket.io");
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const aiService = require('../services/ai.service');
const messageModel = require('../models/message.model');
const {createMemory, queryMemory} = require('../services/vector.service');
// Removed unused Pinecone chat import

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'https://novaai-35p8.onrender.com', 'https://novaai-frontend.onrender.com', 'https://novaai-1-93pi.onrender.com'],
            credentials: true
        }
    });

    io.use(async (socket, next)=> {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        let token = cookies.token;
        
        // If no cookie token, try Authorization header
        if (!token) {
            const authHeader = socket.handshake.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        if(!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id).select("-password");
            
            if (!user) {
                return next(new Error("Authentication error: User not found"));
            }

            socket.user = user;
            next();

        } catch (err) {
            console.error("Socket auth error:", err);
            next(new Error("Authentication error: Invalid token"));
        }
    })

    io.on("connection", (socket) => {
        console.log("User connected: ", socket.user);
        console.log("New socket connection: ", socket.id);

        socket.on("ai-message", async (messagePayload) => {
            

            const [message, vectors] = await Promise.all([
                messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: messagePayload.content,
                role: "user"
            }),
            aiService.generateVector(messagePayload.content)
            ])


            await createMemory({
                vectors,
                memoryId: message._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: messagePayload.content
                }
            })


            const [memory, chatHistory] = await Promise.all([
                queryMemory({
                queryVector: vectors,
                limit: 3,
                metadata: {
                    user: socket.user._id
                }
            }),
            messageModel.find({
                chat: messagePayload.chat
            }).sort({createdAt: -1}).limit(20).lean().then(messages => messages.reverse())
            ])


            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{text: item.content}]
                }
            })

            const ltm = [
                {
                    role: "user",
                    parts: [{text: `
                        these are some previous messages from the chat, use them to generate a response

                        ${memory.map(item => item.metadata.text).join('\n')}
                        `}]
                }
            ]

            console.log(ltm[0])
            console.log(stm)

            const response = await aiService.generateResponse([...ltm, ...stm]);

            
            socket.emit("ai-response", {
                content: response,
                chat: messagePayload.chat
            })


            const [responseMessage, responseVectors] = await Promise.all([
                messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: response,
                role: "model"
            }),
            aiService.generateVector(response)
            ])

            await createMemory({
                vectors: responseVectors,
                memoryId: responseMessage._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: response
                }
            })

        })

    })
}

module.exports = initSocketServer;