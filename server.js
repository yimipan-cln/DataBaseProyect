const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const authRoute = require("./routes/auth");

const productosRoute =
require("./routes/productos");
const clientesRoute =
require("./routes/clientes");
const ventasRoute =
require("./routes/ventas");
const reportesRoute =
require("./routes/reportes");

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/productos",
productosRoute);
app.use("/clientes",
clientesRoute);
app.use("/ventas",
ventasRoute);
app.use("/reportes",
reportesRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send("TechStore funcionando");
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});