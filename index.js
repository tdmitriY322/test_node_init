const express = require('express');
const http = require('http');
const multer = require('multer');
const {
    Server
} = require('socket.io');
const router = express.Router();



const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"],
    }
});

// const store = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, '/images'); // ваша папка для файлов на сервере
//     },
//     filename(req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname);
//     },
// });

// const upload = multer({
//     storage: store
// }).single('file'); // загрузка одного файла

// router.post('http://localhost:8080/images', upload, (req, res, next) => {
//     req.body.file // файл 
//     console.log('file got to server');
// });
/////////////////////////////////////////////////////

io.on('connection', (socket) => {
    console.log(`Пользователь ${socket.id} присоединился`);
    //     setInterval(() => {
    //         let newData = {
    //             id: socket.id,
    //             txtMessage: 'push: 3 new messages',
    //             user: socket.user
    //         };
    //     socket.broadcast.emit('message:received', newData);
    // }, 1000000000);

    socket.on('send-notification', data => {
        // setTimeout(() => {
        //     let newData = {
        //         txtMessage: 'push: 3 new messages',
        //     };
        let newData = {
            txtMessage: 'push: 3 new messages',
        };

        socket.broadcast.emit('new-notificaton', data);
        // }, 1000)


    })

    socket.on('message', data => {
        socket.broadcast.emit('message:received', data);
        console.log('data output', data);
    });
    socket.on('disconnect', () => {
        console.log(`Пользователь ${socket.id} покинул чат`);
    });
});


server.listen(3000, () => {
    console.log('Работает на порту 3000');
});