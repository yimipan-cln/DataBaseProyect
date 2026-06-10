const API_VENTAS = `${API_URL}/ventas`;
const API_CLIENTES = `${API_URL}/clientes`;
const API_PRODUCTOS = `${API_URL}/productos`;

let productosVenta = [];

async function cargarClientes(){

    try{

        const respuesta =
        await fetch(API_CLIENTES);

        const clientes =
        await respuesta.json();

        const select =
        document.getElementById("clienteId");

        select.innerHTML = "";

        clientes.forEach(cliente=>{

            select.innerHTML += `
                <option value="${cliente._id}">
                    ${cliente.nombre}
                </option>
            `;

        });

    }catch(error){

        console.error(error);

    }

}

async function cargarProductos(){

    try{

        const respuesta =
        await fetch(API_PRODUCTOS);

        const productos =
        await respuesta.json();

        const select =
        document.getElementById("productoId");

        select.innerHTML = "";

        productos.forEach(producto=>{

            select.innerHTML += `
                <option value="${producto._id}">
                    ${producto.nombre}
                    (Stock: ${producto.stock})
                </option>
            `;

        });

    }catch(error){

        console.error(error);

    }

}

function agregarProducto(){

    const productoId =
    document.getElementById("productoId").value;

    const cantidad =
    Number(document.getElementById("cantidad").value);

    const selectProducto =
    document.getElementById("productoId");

    const nombreProducto =
    selectProducto.options[
        selectProducto.selectedIndex
    ].text;

    productosVenta.push({

        productoId,
        nombreProducto,
        cantidad

    });

    actualizarTabla();

    document.getElementById("productoId").value = "";
    document.getElementById("cantidad").value = "";

}

function actualizarTabla(){

    const tabla =
    document.getElementById("tablaProductos");

    tabla.innerHTML = "";

    productosVenta.forEach(producto=>{

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombreProducto}</td>
            <td>${producto.cantidad}</td>
        </tr>
        `;

    });

}

async function registrarVenta(){

    const clienteId =
    document.getElementById("clienteId").value;

    const venta = {

        clienteId,
        productos: productosVenta

    };

    console.log("VENTA ENVIADA:");
    console.log(venta);

    try{

        const respuesta =
        await fetch(`${API_URL}/ventas`, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(venta)

        });

        const datos =
        await respuesta.json();

        console.log(datos);

        let ticket = "";

        ticket += "====================\n";
        ticket += "      TECHSTORE\n";
        ticket += "====================\n\n";

        const clienteNombre =
        document.getElementById("clienteId")
        .options[
        document.getElementById("clienteId").selectedIndex
        ].text;

        ticket += "Cliente:\n";
        ticket += clienteNombre + "\n\n";

        ticket += "Productos:\n\n";

        productosVenta.forEach(producto => {

            ticket +=
            `${producto.nombreProducto} x${producto.cantidad}\n`;

        });

        ticket += "\n";

        ticket +=
        `TOTAL: $${datos.total}\n\n`;

        ticket +=
        `Fecha: ${new Date().toLocaleDateString()}\n`;

        ticket += "\n====================";

        document.getElementById(
            "ticketVenta"
        ).textContent = ticket;

        alert("Venta registrada");

        productosVenta = [];

        actualizarTabla();

    }catch(error){

        console.error(error);

    }

}
cargarClientes();
cargarProductos();