const express = require("express");
const router = express.Router();

const Venta = require("../models/Venta");
const Producto = require("../models/Producto");

router.get("/", async(req,res)=>{

    try{

        const ventas =
        await Venta.find();

        res.json(ventas);

    }catch(error){

        res.status(500).json(error);

    }

});

router.post("/", async (req, res) => {

    try {

        const { clienteId, productos } = req.body;

        let total = 0;

        for (const item of productos) {

            const productoBD =
                await Producto.findById(
                    item.productoId
                );

            if (!productoBD) {

                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });

            }

            if (productoBD.stock < item.cantidad) {

                return res.status(400).json({
                    mensaje:
                    `Stock insuficiente para ${productoBD.nombre}`
                });

            }

            productoBD.stock -= item.cantidad;

            await productoBD.save();

            item.precio = productoBD.precio;

            item.subtotal =
                item.precio * item.cantidad;

            total += item.subtotal;

        }

        const venta = new Venta({

            clienteId,
            productos,
            total

        });

        await venta.save();

        res.json(venta);

    } catch (error) {

        res.status(500).json(error);

    }

});

module.exports = router;