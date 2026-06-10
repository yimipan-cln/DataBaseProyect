const express = require("express");

const router = express.Router();

const Cliente = require("../models/Cliente");

/* CONSULTAR */

router.get("/", async (req,res)=>{

    try{

        const clientes =
        await Cliente.find();

        res.json(clientes);

    }catch(error){

        res.status(500).json(error);

    }

});

/* REGISTRAR */

router.post("/", async(req,res)=>{

    try{

        const cliente =
        new Cliente(req.body);

        await cliente.save();

        res.json(cliente);

    }catch(error){

        res.status(500).json(error);

    }

});

/* ACTUALIZAR */

router.put("/:id", async(req,res)=>{

    try{

        const cliente =
        await Cliente.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.json(cliente);

    }catch(error){

        res.status(500).json(error);

    }

});

/* ELIMINAR */

router.delete("/:id", async(req,res)=>{

    try{

        await Cliente.findByIdAndDelete(

            req.params.id

        );

        res.json({

            mensaje:"Cliente eliminado"

        });

    }catch(error){

        res.status(500).json(error);

    }

});

module.exports = router;