import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBC18z_dYO7lykLdcAhjG3uvY1paH88ZaI",
  authDomain: "to-do-list-app-eba1e.firebaseapp.com",
  projectId: "to-do-list-app-eba1e",
  storageBucket: "to-do-list-app-eba1e.appspot.com",
  messagingSenderId: "446898280387",
  appId: "1:446898280387:web:1facde51eeca16e2798f76",
  measurementId: "G-WWX4NN1QZP"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)

}

export { firebase};