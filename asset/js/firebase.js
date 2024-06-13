// Import the functions you need from the SDKs you need    aca habia un °° dos y no me dejaba conectarme, cuando la misma pagina te pone un dos
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {firebaseConfig} from "./credenciales.js"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//no tengo ni idea de porque dan un numero malo pero bueno