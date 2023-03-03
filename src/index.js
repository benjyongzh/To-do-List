import * as projectManager from "./components/projectManager";
import * as DOMManager from "./components/DOMManager";
import './style.css';

//firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA0xvhI-PUNhXci8ascCup-QzpNeTw_u88",
  authDomain: "to-do-list-98ea9.firebaseapp.com",
  projectId: "to-do-list-98ea9",
  storageBucket: "to-do-list-98ea9.appspot.com",
  messagingSenderId: "861087320606",
  appId: "1:861087320606:web:a112509860e4b5f6793c0f"
};

// Saves a new message to Cloud Firestore.
export async function saveNewProject(project) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'projects'), {
      projectName: project.getTitle,
      projectId: project.getProjectID,
      tasks: project.getTasks,
      timestamp: serverTimestamp()
    });
  }
  catch(error) {
    console.error('Error writing new project to Firebase Database', error);
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);