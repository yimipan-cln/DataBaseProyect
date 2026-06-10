const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({

    clienteId: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    productos: [
        {
            productoId: String,
            cantidad: Number,
            precio: Number,
            subtotal: Number
        }
    ],

    total: Number

});

module.exports =
mongoose.model(
    "Venta",
    VentaSchema
);