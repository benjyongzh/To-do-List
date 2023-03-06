import * as eventManager from "./components/eventManager";
import * as projectManager from "./components/projectManager";
import * as DOMManager from "./components/DOMManager";
import './style.css';

//firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

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

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    //var profilePicUrl = getProfilePicUrl();
    eventManager.publish('authStateChanged', {signedIn: true});
  } else {
    // User is signed out!
    eventManager.publish('authStateChanged', {signedIn: false});
  }
}

export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Saves a new message to Cloud Firestore.
export async function saveNewProject(project) {

  console.log('savenewproject is run');
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

initFirebaseAuth();