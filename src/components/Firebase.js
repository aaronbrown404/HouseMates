import * as firebase from 'firebase';

// config from the firebase project
const config = {
    apiKey: "AIzaSyDzH3Hy17z8FuvXy7069w9_sXEEoWQu4xo",
    authDomain: "createhousehold.firebaseapp.com",
    databaseURL: "https://createhousehold.firebaseio.com",
    projectId: "createhousehold",
    storageBucket: "createhousehold.appspot.com",
    messagingSenderId: "451224208673"
};

//This class should be used for all database access
export default class Firebase {
    static auth;

    static userInfo = {
        userName: "",
        userEmail: "",
        userPass: "",
    };

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
    }
};
