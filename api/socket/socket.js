import express from 'express'
import cors from 'cors'
import { Server as serverSocket } from "socket.io"
import http from 'http'
import Chat from '../models/Chat.js'

export const chatSocket = () => {

    const app = express()
    const server = http.createServer(app)
    const io = new serverSocket(server, {
        cors: {
            origin: '*'
        }
    })

    app.use(cors())

    io.on('connection', (socket) => {
        console.log("Usuario Conectado. ID:", socket.id);
        
        socket.on('message', async (message) => {
            
            const newMessage = new Chat(JSON.parse(message));
            await newMessage.save()

            socket.broadcast.emit('message', {
                body: message,
            })
        })
    })

    server.listen(process.env.PORT || 5000, () => {
        console.log('Backend server listening on port 5001')
    });
}