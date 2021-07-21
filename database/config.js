const mongoose = require('mongoose');

const dbConnection = async()=> {
    try {
        
        await mongoose.connect('mongodb://localhost:27017/cafeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB Online :)');

    } catch (error) {
        console.log(error)
        throw new Error ('Error al iniciar la DB :(');
    }
}

module.exports = {
    dbConnection
}