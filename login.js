import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjkA7_QlHxQ4Pjkx2NNiNbFDawfmUjq08",
  authDomain: "fire-leap.firebaseapp.com",
  projectId: "fire-leap",
  storageBucket: "fire-leap.appspot.com",
  messagingSenderId: "756667877802",
  appId: "1:756667877802:web:b87de07d1f93360ee0c3d3",
  measurementId: "G-JG6T968Q2C",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//hereglegchin medeelel
let userUid = "";
let userName = "";

const createUser = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const name = document.getElementById("uName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userUidFromCred = userCredential.user.uid;
      updateProfile(userCredential.user, { displayName: name })
        .then(() => {
          console.log("profile updated");
        })
        .catch((error) => {
          console.error(error);
        });
      getData(userUidFromCred, name);
    })
    .catch((error) => console.log(error));
};

const loginUser = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      getData(userCredential.user.uid, userCredential.user.displayName);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
const signPage = () => {
  document.getElementById("form").innerHTML += `<div>
    <label for="password"> Veryfy Password</label>
    <input type="password" id="vpass" />
  </div>
  <div>
    <label for="text"> Username</label>
    <input type="text" id="uName" />
  </div>
  <div class="flex-row spaceBtwn">
  <a href="index.html" class="center">Back to Log-in page</a>
  <button type="submit" id="regBtn">Register</button>
  </div>`;
  document.getElementById("regBtn").addEventListener("click", createUser);
  document.getElementById("logBtn").style.display = "none";
  document.getElementById("sigBtn").style.display = "none";
};
function getData(userUid, userName) {
  sessionStorage.setItem("UserUID", userUid);
  sessionStorage.setItem("UserName", userName);
  window.location.href = "./main.html";
}
document.getElementById("sigBtn").addEventListener("click", signPage);
document.getElementById("logBtn").addEventListener("click", loginUser);
