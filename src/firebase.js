import * as firebase from 'firebase';

// Initialize Firebase
var config = {
apiKey: "AIzaSyBgzJIGd-NhkOEcKhH3pGRnF-5EjMY2Wt4",
authDomain: "chatpwa-9f1f7.firebaseapp.com",
databaseURL: "https://chatpwa-9f1f7.firebaseio.com",
projectId: "chatpwa-9f1f7",
storageBucket: "chatpwa-9f1f7.appspot.com",
messagingSenderId: "1035520222514"
}; 
export const dbfirebase = firebase.initializeApp(config);