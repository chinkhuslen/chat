import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getDatabase,
  push,
  child,
  ref,
  onValue,
  query,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBjkA7_QlHxQ4Pjkx2NNiNbFDawfmUjq08",
  authDomain: "fire-leap.firebaseapp.com",
  projectId: "fire-leap",
  storageBucket: "fire-leap.appspot.com",
  messagingSenderId: "756667877802",
  appId: "1:756667877802:web:b87de07d1f93360ee0c3d3",
  measurementId: "G-JG6T968Q2C",
};
console.log("Setup start.");
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const mainBody = document.getElementsByClassName("chatArea")[0];
const userUid = sessionStorage.getItem("UserUID");
const userName = sessionStorage.getItem("UserName");
const auth = getAuth(app);
console.log("Setup stop.");

const realChatRef = query(ref(db, "sms"));

onValue(realChatRef, (snapshot) => {
  if (snapshot.exists()) {
    let list = "";
    snapshot.forEach((doc) => {
      if (doc.val().name == userName) {
        list += `<div class="smsCon right">
        <div class="chatCon center">${doc.val().chat}</div>
        <div class="center flex-col">
        <div class="userName center">Me</div>
        <div class="date">${doc.val().date}</div>
      </div>
            </div>`;
      } else {
        list += `<div class="smsCon left">
        <div class="center flex-col">
        <div class="userName center">${doc.val().name}</div>
        <div class="date">${doc.val().date}</div>
      </div>
                <div class="chatCon center">${doc.val().chat}</div>
            </div>`;
      }
    });
    mainBody.innerHTML = list;
  } else {
    mainBody.innerHTML = "";
  }
  mainBody.scrollTop = mainBody.scrollHeight;
});
function sendChat() {
  let sms = document.getElementById("inp").value;
  document.getElementById("inp").value = "";
  push(child(dbRef, "sms/"), { name: userName, chat: sms, date: smsTime() })
    .then()
    .catch((err) => {
      console.log("err: ", err);
    });
}
const smsTime = () => {
  let time = Date();
  return time.slice(3, 10) + time.slice(15, 21);
};
const btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", () => {
  sendChat();
});
document.getElementById("inp").addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    sendChat();
  }
});
