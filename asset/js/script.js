import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesa.js";
window.addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar);

    cargarDatos();
    //document.getElementById("btnActualizar").addEventListener("click",actualizar);
})

const registrar = ()=>{
    let eUsuario = document.getElementById("usuario");
    let eNombre = document.getElementById("nombre");
    let eEdad = document.getElementById("edad");
    let eCorreo = document.getElementById("correo");
    let eTelefono = document.getElementById("telefono");
    let etributo = document.getElementById("opcion");
    let etext = document.getElementById("area");
    var echeck = document.querySelector(".formulario-input-check").value;
    console.log(echeck)
    let vUsuario = eUsuario.value;
    let vNombre = eNombre.value;
    let vEdad = eEdad.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let vtributo = etributo.value;
    let vtext = etext.value;
    let objeto = {usuario:vUsuario,nombre:vNombre,edad:vEdad,correo:vCorreo,telefono:vTelefono,tributo:vtributo,mensaje:vtext,acepto:echeck};
    console.log(objeto);
    registrarPersona(objeto).then(()=>{
        alert("Se registra con exito.")
        cargarDatos();
        }).catch((error)=>(
        console.log(error)
    ));
}

const cargarDatos = ()=>{
    //traer de las promesas todo lo registrado
    
    obtenerPersonas().then((personas)=>{
        console.log("hola");
        console.log(personas)
        //cargarlo en la tabla del html
        let estructura = ""
        personas.forEach((p)=>{
            estructura += "<tr>"
            estructura += "<td>"+p.nombre+"<td>"
            estructura += "<td>"+p.apellido+"<td>"
            estructura += "<td>"+p.rut+"<td>"
            estructura += "<td>"+p.correo+"<td>"
            estructura += "<td>"+p.edad+"<td>"
            estructura += "<td>"+p.fechanacimiento+"<td>"
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            estructura += "</tr>";
        })
        //document.getElementById("cuerpotabla").innerHTML = estructura;
        personas.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDfnacimiento").value = p.fechanacimiento;
                document.getElementById("btnActualizar").value = p.id;
            });
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar a:\n"+p.nombre+" "+p.apellido)){
                    console.log("Vamos a eliminar")
                    eliminarPersona(p.id).then(()=>{
                        alert("Eliminaste con exito")
                        cargarDatos();
                    }).catch(()=>{
                        console.log(e)
                    })
                }else{
                    console.log("Cancelaste la eliminacion")
                }
            })

        })
    });
}

const actualizar = ()=>{
    //recuperar campos del formulario
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eRut = document.getElementById("UPDrut");
    let eCorreo = document.getElementById("UPDcorreo");
    let eEdad = document.getElementById("UPDedad");
    let eFnacimiento = document.getElementById("UPDfnacimiento");
    let vRut = eRut.value;
    let vApellido = eApellido.value;
    let vCorreo = eCorreo.value;
    let vEdad = eEdad.value;
    let vFnacimiento = eFnacimiento.value;
    let vNombre = eNombre.value;
    let objeto = {
        nombre:vNombre,
        apellido:vApellido,
        rut:vRut,
        correo:vCorreo,
        edad:vEdad,
        fechanacimiento:vFnacimiento
    }
    let id = document.getElementById("btnActualizar").value;
    //envio el objeto
    document.getElementById("btnActualizar").disabled = "True";
    actualizarPersona(objeto,id).then(()=>{  //en caso de que se cumpla
        alert("Se actualiza con exito")
        cargarDatos();
    }).catch((e)=>{ //en caso de que no se cumpla
        console.log(e)
    }).finally(()=>{
        document.getElementById("btnActualizar").disabled = "";
    })
};


const aumentar = ()=>{
    let formulario = document.getElementById("formulario")
    alert(formulario.style.fontSize);
}

const cambiarContraste = ()=>{
    let ebody = document.body;
    let fondo = ebody.style.backgroundColor;

    if(fondo == "black"){
        ebody.style.backgroundColor = "antiquewhite"
        ebody.style.color = "black"
    }else{
        ebody.style.backgroundColor = "black"
        ebody.style.color = "white"
    }
}
