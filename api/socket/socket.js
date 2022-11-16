import Chat from '../models/Chat.js'

export const chatSocket = (io) => {

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
}