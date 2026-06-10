const express = require("express");

const router = express.Router();

const Producto = require("../models/Producto");

router.post("/", async (req, res) => {

    try {

        const producto =
            new Producto(req.body);

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json(error);

    }

});

router.get("/", async (req, res) => {

    try {

        const productos =
            await Producto.find();

        res.json(productos);

    } catch (error) {

        res.status(500).json(error);

    }

});

router.put("/:id", async (req, res) => {

    try {

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(producto);

    } catch (error) {

        res.status(500).json(error);

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Producto.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        res.status(500).json(error);

    }

});

module.exports = router;