import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesa.js";
window.addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar);

    cargarDatos();
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
})//añade los eventos para actualizar, eliminar, obtener y registrar personas

window.addEventListener("load",()=>{
document.getElementById("Contrastebtn").addEventListener("click",cambiarContraste);
})//añade el evento para cambiar contraste
window.addEventListener("load",()=>{
    document.getElementById("Aumentarbtn").addEventListener("click",aumentar);
})//añade el evento para cambiar tamaño de fuente

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const registrar = ()=>{
    let eUsuario = document.getElementById("usuario");
    let eNombre = document.getElementById("nombre");
    let eEdad = document.getElementById("edad");
    let eCorreo = document.getElementById("correo");
    let eTelefono = document.getElementById("telefono");
    let etributo = document.getElementById("opcion");
    let etext = document.getElementById("area");//se llama a cada input para recoger datos
    var echeck = document.querySelector(".formulario-input-check").value;
    //console.log(echeck)
    let vUsuario = eUsuario.value;
    let vNombre = eNombre.value;
    let vEdad = eEdad.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let vtributo = etributo.value;
    let vtext = etext.value;//aca abajo se crea el objeto
    let objeto = {usuario:vUsuario,nombre:vNombre,edad:vEdad,correo:vCorreo,telefono:vTelefono,tributo:vtributo,mensaje:vtext,acepto:echeck};
    //console.log(objeto);
    document.getElementById("btnActualizar").disabled = "True";//puse para desabilitar el boton pero no me doy cuenta si funciona
    registrarPersona(objeto).then(()=>{//se intenta enviar el objeto
        alert("Se registra con exito.")
        cargarDatos();
        }).catch((error)=>(//da error si falla
        console.log(error)
        )).finally(()=>{
            document.getElementById("btnActualizar").disabled = "";
        })//activa el boton
}

const cargarDatos = ()=>{    
    obtenerPersonas().then((persona)=>{
        let estructura = ""
        persona.forEach((p)=>{
            estructura += "<tr>"
            estructura += "<td>"+p.usuario+"<td>"
            estructura += "<td>"+p.nombre+"<td>"
            estructura += "<td>"+p.edad+"<td>"
            estructura += "<td>"+p.correo+"<td>"
            estructura += "<td>"+p.telefono+"<td>"
            estructura += "<td>"+p.tributo+"<td>"
            estructura += "<td>"+p.mensaje+"<td>"
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"//para mostrar los datos en la bd
            estructura += "</tr>";
        })
        document.getElementById("cuerpotabla").innerHTML = estructura;
        persona.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDusuario").value = p.usuario;
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDtelefono").value = p.telefono;
                document.getElementById("btnActualizar").value = p.id;
            });//se llama a los datos seleccionados
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{//evento para eliminar datos
                if(confirm("Desea eliminar a:\n"+p.nombre+" "+p.apellido)){
                    console.log("Vamos a eliminar")
                    document.getElementById("btnActualizar").disabled = "True";
                    eliminarPersona(p.id).then(()=>{
                        alert("Eliminaste con exito")
                        cargarDatos();
                    }).catch(()=>{
                        console.log(e)
                    }).finally(()=>{
                        document.getElementById("btnActualizar").disabled = "";
                    })
                }else{
                    console.log("Cancelaste la eliminacion")
                }
            })

        })
    });
}

const actualizar = ()=>{
    let eUsuario = document.getElementById("UPDusuario");
    let eNombre = document.getElementById("UPDnombre");
    let eEdad = document.getElementById("UPDedad");
    let eCorreo = document.getElementById("UPDcorreo");
    let eTelefono = document.getElementById("UPDtelefono");
    let etext = document.getElementById("UPDarea");//se llaman a los datos seleccionados
    //console.log(echeck)
    let vUsuario = eUsuario.value;
    let vNombre = eNombre.value;
    let vEdad = eEdad.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let objeto = {usuario:vUsuario,nombre:vNombre,edad:vEdad,correo:vCorreo,telefono:vTelefono};//se crea al objeto
    //console.log(objeto);
    let id = document.getElementById("btnActualizar").value;
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
    let formulario = document.body;
    let tamano = formulario.style.fontSize;
    if (tamano == "20px"){
        formulario.style.fontSize = "35px"
    }else{
        formulario.style.fontSize = "20px"
    }
}//funcion para cambiar el tamaño de la fuente

const cambiarContraste = ()=>{
    let ebody = document.body;
    let fondo = ebody.style.backgroundColor;
    console.log(fondo)
    if(fondo == "black"){
        ebody.style.backgroundColor = "antiquewhite"
        ebody.style.color = "black"
    }else{
        ebody.style.backgroundColor = "black"
        ebody.style.color = "white"
    }//cambiar el color del background
}

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	edad: /^\d{1,3}$/ // 1 a 3 numeros.
}//expresiones para la validacion de datos

const campos = {
	usuario : false,
	nombre : false,
	edad : false,
	correo : false,
	telefono : false
}//lista de datos a validar

const validarFormulario = (e)=>{
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
        case "edad":
			validarCampo(expresiones.edad, e.target, 'edad');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}//funcion para validar cada campo
}

const validarCampo = (expresion, input, campo)=>{
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} .mensaje-error`).classList.remove('mensaje-error-activo');
		campos[campo]=true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} .mensaje-error`).classList.add('mensaje-error-activo');
		campos[campo]=false;//aca deberia de hacer cambios de estilos para mostrar si esta bueno o malo, pero no me resulto
	}
}

inputs.forEach((input)=>{
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});//esto era para que en caso de descliquear un input hiciera la comprobacion

formulario.addEventListener('click',(e)=>{
	e.preventDefault();
	if(campos.usuario && campos.nombre && campos.edad && campos.correo && campos.telefono){
		formulario.reset();//aca era para comprobar si todos los campos requeridos estubieran todos comprobados
        //no resulto tampoco, como los cambios de estilo
		document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo');
		setTimeout(()=>{
			document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo');
		},5000);
		document.querySelectorAll('.formulario-grupo-correcto').forEach((icono)=>{
			icono.classList.remove('formulario-grupo-correcto')
		});
	}else{
		document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo');
		setTimeout(()=>{
			document.getElementById('formulario-mensaje').classList.remove('formulario-mensaje-activo');
		},5000);
	}
});// yo creo que si hubiera tenido mas tiempo, podria haber adaptado mejor el codigo, pero no me resulto y el resultado
//es mediocre en el mejor de los casos.
//al menos pudo conectarse a la bd, registrar, actuañizar y eliminar los datos.