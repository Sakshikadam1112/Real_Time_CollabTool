import express, { urlencoded } from "express";
import dbConnection from "./connection/db.js";
//routes
import awtRouter from "./route/auth.js";
import cors from 'cors';
import docroute from "./route/document.js"
import { Server } from "socket.io";
import http from "http";

const app=express();
const Port=5000;

const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Socket.io setup for real-time collaboration
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
//Database connection 
dbConnection("mongodb+srv://rakshit123:rakshit123@rakshitcluster.dqxariv.mongodb.net/EyInternship");

//middleware
app.use(express.json());
app.use("/api/auth",awtRouter);
app.use("/api/documents",docroute);

//connection happens when a io called made from socket.io client
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    //user on documentdetails - useuseffect
    socket.on('joinDocument', (documentId) => {
        socket.join(documentId);
        console.log(`User joined document ${documentId}`);
    });
    // user when changes the input feild values
    socket.on('documentUpdate', ({ documentId, title, content }) => {
        socket.to(documentId).emit('receiveUpdate', { title, content });
    });

    //this is not used by the frontend
    socket.on('sendMessage', ({ documentId, message }) => {
        socket.to(documentId).emit('receiveMessage', message);
    });
});

server.listen(Port,console.log(`Server started at Port: ${Port}`))