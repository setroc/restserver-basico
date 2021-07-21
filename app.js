require('dotenv').config();

const Server = require('./models/server');


const server = new Server();
server.listen();

/* 
    Comandos para levanta DB

    sudo systemctl start mongodb
    sudo systemctl status mongodb
    mongo

    Comandos para matar servidor DB

    mongo
    use admin
    db.shutdownServer()

*/