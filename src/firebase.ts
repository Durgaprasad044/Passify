import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJ0j4VjJCc1VG7kWGGPQD5O1RXpmd7C3g",
  authDomain: "agentic-ai-975d4.firebaseapp.com",
  projectId: "agentic-ai-975d4",
  storageBucket: "agentic-ai-975d4.firebasestorage.app",
  messagingSenderId: "299372568976",
  appId: "1:299372568976:web:dcdf3a554b9e10e9ea1315",
  measurementId: "G-7J474MCCZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
}; 