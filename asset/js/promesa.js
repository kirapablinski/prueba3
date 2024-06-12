import { db } from "./firebase.js";
import { addDoc, collection , getDocs , doc , updateDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
export const registrarPersona = async(persona)=>{
    const docRef = await addDoc(collection(db, "persona"), persona);;
}

export const obtenerPersonas = async()=>{
    //recuperar la referencia (ruta)
    const ref = collection(db, "personas");
    //recuperamos una captura de la bd
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc) => {
        //console.log(doc.id);
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id})
    });
    console.log(listado);
    return listado;
}

export const actualizarPersona = async(objeto,id)=>{
    const ref = doc(db,"personas",id);
    await updateDoc(ref,objeto)
}
export const eliminarPersona = async(id)=>{
    const ref = doc(db,"personas",id)
    await deleteDoc(ref);
}