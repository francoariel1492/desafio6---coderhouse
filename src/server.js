const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const morgan = require('morgan');
const router = require("./router");
const mongoose = require('mongoose');
const { MongoChatManager } = require('./dao/mongoClassManagers/chatClass/chatMongoManager');
const chatMongo = new MongoChatManager();


const { port } = require('./config');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

const hbs = handlebars.create({
    extname: '.handlebars',
    defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
  });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// app.engine('handlebars', handlebars.engine());
// app.set('views', __dirname + '/views');

router(app);

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority', error => {
    if (error) {
        console.log(`Cannot connect to db. error ${error}`);
    }
    console.log('db conected');
});

app.get('/',  (req, res) => {
    res.render('index.handlebars', {mesagge: 'Hi from server without socket.io'});
});

const httpServer = app.listen( port, () => {
    console.log(`Server runing at port ${port}`)
});

global.io = new Server(httpServer);


io.on('connection', socket => {
    console.log(`New client with id ${socket.id}`);

    // socket.on('statusProductsList', data => {
    //     console.log(data);
    // });

    socket.on('newUser', async user => {
        //console.log(user)
        socket.emit('bienvenida', user);
        const mesagges = await chatMongo.getMesagges()
        io.emit("messageLogs", mesagges)

      })

    socket.on('message', async data => {
        chatMongo.saveMesagge(data)
        const mesagges = await chatMongo.getMesagges()
        io.emit("messageLogs", mesagges)
      })

    socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
});