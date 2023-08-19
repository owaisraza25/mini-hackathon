// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
  getFirestore, collection,
  query, where, addDoc, doc, setDoc, getDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALhDrKDnUMVfR5lNo5qJnZVhq5s0lPXQ0",
  authDomain: "fire-base-1164c.firebaseapp.com",
  projectId: "fire-base-1164c",
  storageBucket: "fire-base-1164c.appspot.com",
  messagingSenderId: "1019444692872",
  appId: "1:1019444692872:web:b0096eb7cef059c5ac5c3d",
  measurementId: "G-GV8YCZJBXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);


let Name = document.getElementById("Name")
let FatherName = document.getElementById("fatherName")
let regContainer = document.getElementById("container")
let loginContainer = document.getElementById("login-container")
let contentContainer = document.getElementById("content-container")
let myContainer = document.getElementById("my-container")
let regNowBtn = document.getElementById("reg-now-btn")
let loginNowBtn = document.getElementById("log-now-btn")
let registerBtn = document.getElementById("register-btn")
let loginBtn = document.getElementById("login_btn")
let logoutBtn = document.getElementById("log-out")
let userImg = document.getElementById("nav-img")
let userName = document.getElementById("nav-name")
let publish_Btn = document.getElementById("Publish-btn")
let blogTitle = document.getElementById("title").value
let blogDisc = document.getElementById("textarea").value

loginContainer.style.display = "none"
regContainer.style.display = "none"
contentContainer.style.display = "block"
myContainer.style.display = "none"


regNowBtn.addEventListener("click", registercontainer)
loginNowBtn.addEventListener("click", logincontainer)
registerBtn.addEventListener("click", registered)
loginBtn.addEventListener("click", loginButton)
logoutBtn.addEventListener("click", logout)
publish_Btn.addEventListener("click", publishBlog)






function registered() {
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  let Name = document.getElementById("Name").value







  createUserWithEmailAndPassword(auth, email, password)

    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      const userInfo = {

        Name,
        email,
        uid: user.uid
      }

      const userRef = doc(db, "owais_users", user.uid)

      await setDoc(userRef, userInfo)
})

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      


      // try {
      //   const docRef = await addDoc(collection(db, `users/${auth.user.uid}`), {
      //     firstName: firstName.value,
      //     lastName: lastName.value,
      //     email: email.value,
      //     Img: choseImg.src
      //   });

      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }

    })
}



function registercontainer() {
  regContainer.style.display = "block"
  loginContainer.style.display = "none"


}

function logincontainer() {
  regContainer.style.display = "none"
  loginContainer.style.display = "block"


}


function loginButton() {
  let login_email = document.getElementById("login_email")
  let login_password = document.getElementById("login_password")


  signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...

      console.log("user-->", user)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error-->", errorMessage)


    });
}


onAuthStateChanged(auth, (user) => {
  let userName = document.getElementById("nav-name")
  let Name = document.getElementById("Name")
  let choseImg = document.getElementById("chose-img")


  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = auth.currentUser.uid;
    choseImg.src = userImg
     userName = Name.value
    loginContainer.style.display = "none"
    regContainer.style.display = "none"
    myContainer.style.display = "block"
    console.log("uid=>", uid)
    // ...
  } else {
    // User is signed out
    // ...
    loginContainer.style.display = "block"

  }
});

function logout() {

  signOut(auth).then(() => {
    document.getElementById("my-container").style.display = "none"
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });


}


function publishBlog() {

  let myBlogs = document.getElementById("my-blogs-content")

  

  if (blogTitle.value == "" || blogDisc.value == "") {
    alert("please fill in both filed")

  } else {
    myBlogs.innerHTML = null
    const userBlog = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${blogTitle}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${Name}</h6>
    <p class="card-text">${blogDisc}</p>

   </div>
</div>
`
myBlogs.innerHTML += userBlog

}

}













