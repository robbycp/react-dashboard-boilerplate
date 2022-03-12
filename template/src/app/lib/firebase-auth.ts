import { useState } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { AuthUser } from 'app/redux/slices/authSlice';
import { app } from './firebase';

const auth = getAuth(app);

export const useAuthFirebase = () => {
  const [dataUser, setDataUser] = useState<AuthUser>()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDataUser(user)
    } else {
      setDataUser(undefined)
    }
  });
  return {
    isAuth: !!dataUser,
    dataUser: dataUser && {
      displayName: dataUser.displayName,
      email: dataUser.email,
      emailVerified: dataUser.emailVerified,
      photoURL: dataUser.photoURL,
    },
  }
}

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const signinGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return {
      token,
      user,
    }
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    const errorThrown = {
      errorCode,
      errorMessage,
      email,
      credential
    }
    // console.log('[auth] signinGoogle error', errorThrown)
    throw errorThrown
  }
}

export const signoutGoogle = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    // console.log('[auth] signoutGoogle error', errorThrown)
    throw error
  }
}