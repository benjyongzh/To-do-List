import * as projectManager from "./components/projectManager";
import * as DOMManager from "./components/DOMManager";
import './style.css';

//firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA0xvhI-PUNhXci8ascCup-QzpNeTw_u88",
  authDomain: "to-do-list-98ea9.firebaseapp.com",
  projectId: "to-do-list-98ea9",
  storageBucket: "to-do-list-98ea9.appspot.com",
  messagingSenderId: "861087320606",
  appId: "1:861087320606:web:a112509860e4b5f6793c0f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);