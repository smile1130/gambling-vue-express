import connection from '../config/connectDB';
require('dotenv').config();

const sendMessageAdmin = (io) => {
    io.on('connection', (socket) => {
        socket.on('data-server', (msg) => {
            io.emit('data-server', msg);
        });
        socket.on('data-server_2', (msg) => {
            io.emit('data-server_2', msg);
        });
        socket.on('data-server-5', (msg) => {
            io.emit('data-server-5', msg);
        });
        socket.on('data-server-3', (msg) => {
            io.emit('data-server-3', msg);
        });
        // socket.on("disconnect", () => {
        // console.log('a user disconnect ' + socket.id);
        // });
    });
} 
module.exports = {
    sendMessageAdmin,
}