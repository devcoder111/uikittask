import * as firebase from 'firebase';
const config = {
	  apiKey: "AIzaSyA9era-3rZl2r12o3zi7KxQRxdDuWrNw5M",
	  authDomain: "test111-29980.firebaseapp.com",
	  databaseURL: "https://test111-29980.firebaseio.com",
	  projectId: "test111-29980",
	  storageBucket: "test111-29980.appspot.com",
	  messagingSenderId: "1068744502107",
	  appId: "1:1068744502107:web:5f2844507a09c5c9"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos")