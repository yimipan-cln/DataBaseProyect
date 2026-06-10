const API_URL = "http://localhost:3000/productos";

const formProducto = document.getElementById("formProducto");
const tablaProductos = document.getElementById("tablaProductos");

formProducto.addEventListener("submit", async (e) => {

    e.preventDefault();

    const producto = {

        nombre: document.getElementById("nombre").value,
        categoria: document.getElementById("categoria").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value)

    };

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(producto)

        });

        formProducto.reset();

        cargarProductos();

    } catch(error) {

        console.error(error);

    }

});

async function cargarProductos() {

    try {

        const respuesta = await fetch(API_URL);

        const productos = await respuesta.json();

        tablaProductos.innerHTML = "";

        productos.forEach(producto => {

            tablaProductos.innerHTML += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.categoria}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
            `;

        });

    } catch(error) {

        console.error(error);

    }

}

cargarProductos();