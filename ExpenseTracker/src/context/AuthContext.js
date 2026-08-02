import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const userData = {
        uid: firebaseUser.uid,
        name: name,
        email: email,
      };
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      return { success: true };
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return { success: false, message: 'Email already registered!' };
      }
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        return { success: false, message: 'Invalid email or password!' };
      }
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const updateUser = async (name, email) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), { name, email });
      setUser({ ...user, name, email });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn, login, logout, signup, updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}