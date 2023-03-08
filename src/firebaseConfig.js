import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyAfCqEBOK5DUXCsRdYOLgMFC_r1uemD4EI",
  authDomain: "cuivet-5596d.firebaseapp.com",
  projectId: "cuivet-5596d",
  storageBucket: "cuivet-5596d.appspot.com",
  messagingSenderId: "315239198665",
  appId: "1:315239198665:web:e49525e93f62be8abf4218"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;
