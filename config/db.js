const mongoose = require("mongoose");

const conectarDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URL
        );

        console.log("MongoDB conectado");

    } catch(error) {

        console.error(error);

    }

};

module.exports = conectarDB;