const formulario = document.getElementById("formulario")
let botonAumentar = document.querySelector("button")
let fontSize = 20;

function aumentar() {
	if(fontSize==20){
    fontSize += 15;
    document.body.style.fontSize = fontSize + 'px';
	}else{
	fontSize -= 15;
    document.body.style.fontSize = fontSize + 'px';
	}
}
function cambiarContraste(){
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