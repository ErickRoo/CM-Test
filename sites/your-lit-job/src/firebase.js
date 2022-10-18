import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const config = {
  apiKey: process.env.GATSBY_YLJ_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_YLJ_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_YLJ_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_YLJ_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_YLJ_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_YLJ_FIREBASE_APP_ID,
};

const app = typeof window !== 'undefined' ? initializeApp(config) : {};

export const profileDatabaseName = 'users';
export const auth = typeof window !== 'undefined' ? getAuth(app) : {};
export const db = typeof window !== 'undefined' ? getFirestore(app) : {};
export const functions = typeof window !== 'undefined' ? getFunctions(app) : {};
export default app;

if (typeof window !== 'undefined' && process.env.GATSBY_YLJ_FIREBASE_AUTH_EMULATOR) {
  connectAuthEmulator(auth, process.env.GATSBY_YLJ_FIREBASE_AUTH_EMULATOR);
}

if (typeof window !== 'undefined' && process.env.GATSBY_YLJ_FIREBASE_FIRESTORE_EMULATOR) {
  const firestoreEmulatorUrl = new URL(process.env.GATSBY_YLJ_FIREBASE_FIRESTORE_EMULATOR);
  connectFirestoreEmulator(db, firestoreEmulatorUrl.hostname, firestoreEmulatorUrl.port);
}

if (typeof window !== 'undefined' && process.env.GATSBY_YLJ_FIREBASE_FUNCTIONS_EMULATOR) {
  const functionsEmulatorUrl = new URL(process.env.GATSBY_YLJ_FIREBASE_FUNCTIONS_EMULATOR);
  connectFunctionsEmulator(functions, functionsEmulatorUrl.hostname, functionsEmulatorUrl.port);
}
