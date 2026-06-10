const express = require("express");

const router = express.Router();

const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");
const Venta = require("../models/Venta");

router.get("/", async (req, res) => {

    try {

        const totalProductos =
            await Producto.countDocuments();

        const totalClientes =
            await Cliente.countDocuments();

        const totalVentas =
            await Venta.countDocuments();

        const ventas =
            await Venta.find();

        let ingresos = 0;

        ventas.forEach(venta => {

            ingresos += venta.total;

        });

        const inventario =
            await Producto.find();

        res.json({

            totalProductos,
            totalClientes,
            totalVentas,
            ingresos,
            inventario

        });

    } catch (error) {

        res.status(500).json(error);

    }

});

router.get("/ventas-fecha", async (req, res) => {

    try {

        const { inicio, fin } = req.query;

        const ventas = await Venta.find({

            fecha: {

                $gte: new Date(inicio),

                $lte: new Date(fin)

            }

        });

        const reporte = ventas.map(v => ({

            fecha: v.fecha,
            total: v.total

        }));

        res.json(reporte);

    } catch (error) {

        res.status(500).json(error);

    }

});

router.get("/mas-vendidos", async (req, res) => {

    try {

        const resultado = await Venta.aggregate([

            {
                $unwind: "$productos"
            },

            {
                $group: {

                    _id: "$productos.productoId",

                    cantidadVendida: {
                        $sum: "$productos.cantidad"
                    }

                }
            },

            {
                $sort: {
                    cantidadVendida: -1
                }
            }

        ]);

        const reporte = [];

        for(const item of resultado){

            const producto =
            await Producto.findById(item._id);

            reporte.push({

                nombre:
                producto?.nombre ||
                "Producto eliminado",

                cantidadVendida:
                item.cantidadVendida

            });

        }

        res.json(reporte);

    } catch (error) {

        res.status(500).json(error);

    }

});
module.exports = router;