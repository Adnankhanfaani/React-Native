import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC467dRtw4Z8INk_7krwKj-ENtLpQ5yB3E",
  authDomain: "expensetracker-1a5cd.firebaseapp.com",
  projectId: "expensetracker-1a5cd",
  storageBucket: "expensetracker-1a5cd.firebasestorage.app",
  messagingSenderId: "186445303707",
  appId: "1:186445303707:web:a5e02b1b1f2a84602f9b3e"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);