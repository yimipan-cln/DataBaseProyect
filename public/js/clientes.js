const API = `${API_URL}/clientes`;

const formCliente = document.getElementById("formCliente");
const tablaClientes = document.getElementById("tablaClientes");

formCliente.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const cliente = {

        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value

    };

    try {

        await fetch(API_URL, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(cliente)

        });

        formCliente.reset();

        cargarClientes();

    } catch(error){

        console.error(error);

    }

});

async function cargarClientes(){

    try{

        const respuesta = await fetch(API_URL);

        const clientes = await respuesta.json();

        tablaClientes.innerHTML = "";

        clientes.forEach(cliente=>{

            tablaClientes.innerHTML += `
            <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.correo}</td>
            </tr>
            `;

        });

    }catch(error){

        console.error(error);

    }

}

cargarClientes();