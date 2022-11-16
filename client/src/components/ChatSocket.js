import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import { useSelector } from 'react-redux'
import "./ChatSocket.css"

const socket = io('https://app-ecommerce-backend-coder.herokuapp.com')

const ChatSocket = () => {
    const user = useSelector(state => state.user.currentUser)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const handleSubmitMessage = (e) => {
        e.preventDefault();

        socket.emit('message', JSON.stringify({ message: message, username: user.username }));

        const newMessage = {
            message,
            username: user.username,
        }
        setMessages([newMessage, ...messages])
        setMessage("")

    }

    useEffect(() => {
        const receiveMessage = message => {

            const newMessage = JSON.parse(message.body);
            setMessages([newMessage, ...messages])
        }

        socket.on('message', receiveMessage)

        return () => {
            socket.off('message', receiveMessage)
        }

    }, [messages])

    return (
        <div className="contenedor">
            <input type="checkbox" id="toggle" />
            <label htmlFor="toggle" className="buttonChat" />
            <form className="formChat" onSubmit={e => handleSubmitMessage(e)}>
                <h2>CHAT</h2>
                <div className="message">
                    <input
                        placeholder="Escribe aquí tu mensaje"
                        className="sendInput"
                        type="text"
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                    />
                </div>
                <ul className="ulBoxMessage">
                    {user ? messages.map((message, index) => (
                        <div 
                            style={{ 
                                alignSelf: 
                                `${user.username === message.username 
                                ? 'flex-end' : 'flex-start'}`
                                }}
                            >
                            <li key={index}
                                className="liItemMessage"
                                style={{
                                    backgroundColor: `${user.username === message.username
                                        ? "#cbf3c7"
                                        : "#fff"
                                    }`
                                }}
                            >
                                <p style={{ fontSize: "15px" }}>{message.message}</p>
                                <p style={{ fontSize: "12px", color: "black" }}>from: {message.username} </p>
                            </li>
                        </div>
                    )) :
                        <p>Debes Iniciar Sesión para poder usar el Chat</p>
                    }
                </ul>
            </form>
        </div>
    )
}

export default ChatSocket