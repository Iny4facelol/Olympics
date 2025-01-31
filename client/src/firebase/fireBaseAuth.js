import app from '../firebase/firebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario logeado: ", user);
    return user;
  } catch (error) {
    console.error("Error de autenticación", error);
  }
};

const logOutGoogle = async () => {
  try {
    await signOut(auth);
    console.log("Usuario deslogueado");
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};

export { signInWithGoogle, logOutGoogle };
