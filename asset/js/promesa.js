import { db } from "./firebase.js";
import { addDoc, collection , getDocs , doc , updateDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
export const registrarPersona = async(persona)=>{
    const docRef = await addDoc(collection(db, "persona"), persona);;
}

export const obtenerPersonas = async()=>{
    const ref = collection(db, "persona");
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc) => {
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id})
    });
    console.log(listado);
    return listado;
}

export const actualizarPersona = async(objeto,id)=>{
    const ref = doc(db,"persona",id);
    await updateDoc(ref,objeto)
}
export const eliminarPersona = async(id)=>{
    const ref = doc(db,"persona",id)
    await deleteDoc(ref);
}
//no hay mucho que decir aca, sabe de donde lo sacamos todos