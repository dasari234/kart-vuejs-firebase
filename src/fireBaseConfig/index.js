import firebase from 'firebase';

// firebase init goes here
const config = {
    apiKey: "AIzaSyDzMIKNGdr2MZRvRlzIDzaoanU0o7oRuN8",
    authDomain: "auth9999-d653c.firebaseapp.com",
    databaseURL: "https://auth9999-d653c.firebaseio.com",
    projectId: "auth9999-d653c",
    storageBucket: "auth9999-d653c.appspot.com",
    messagingSenderId: "395258336007",
    appId: "1:395258336007:web:c2ed0a93c70b2229596ba2",
    measurementId: "G-HZ359H7XGX"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
// const settings = {
//     timestampsInSnapshots: true
// }
// db.settings(settings)

// firebase collections
const usersCollection = db.collection('users');
const productsCollection = db.collection('products');
const cartsCollection = db.collection('carts');
const ordersCollection = db.collection('orders');

const batch = db.batch();

export {
    batch,
    db,
    auth,
    currentUser,
    usersCollection,
    productsCollection,
    cartsCollection,
    ordersCollection

}