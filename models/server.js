const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';

        // Conectar a DB
        this.conectarDB();

        //Middlewares = funciones que se ejecutan antes de otra
        this.middlewares()

        //Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Parseo y lectura del body
        this.app.use(express.json());
        //CORS
        this.app.use(cors())
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto',this.port);
        })
    }
}

module.exports = Server;