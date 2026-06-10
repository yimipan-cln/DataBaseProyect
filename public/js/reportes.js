const API_URL =
"http://localhost:3000/reportes";

async function cargarReportes(){

    try{

        const respuesta =
        await fetch(API_URL);

        const datos =
        await respuesta.json();

        document.getElementById(
            "totalVentas"
            ).textContent =
        "$" + datos.ingresos;

        const lista =
        document.getElementById(
            "stockBajo"
        );

        lista.innerHTML = "";

             datos.inventario
            .filter(producto => producto.stock <= 10)
            .forEach(producto=>{

            lista.innerHTML += `
                <li>
                    ${producto.nombre}
                    (${producto.stock})
                </li>
            `;

        });

    }catch(error){

        console.error(error);

    }

}

cargarReportes();