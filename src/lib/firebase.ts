// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase ,} from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbbUz6o8F4WoTB_ARtDdEIhgcXHyvXGvM",
    authDomain: "test1-ff991.firebaseapp.com",
    projectId: "test1-ff991",
    databaseURL: "https://test1-ff991-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "test1-ff991.appspot.com",
    messagingSenderId: "963331175838",
    appId: "1:963331175838:web:1fc98c7135b3e0cdbc128f",
    measurementId: "G-VVLZQRG9TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;