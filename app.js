
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, push, get, child, ref, update, onChildChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjkA7_QlHxQ4Pjkx2NNiNbFDawfmUjq08",
  authDomain: "fire-leap.firebaseapp.com",
  projectId: "fire-leap",
  storageBucket: "fire-leap.appspot.com",
  messagingSenderId: "756667877802",
  appId: "1:756667877802:web:b87de07d1f93360ee0c3d3",
  measurementId: "G-JG6T968Q2C"
};
console.log("Setup start.")
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
console.log("Setup stop.")
const dbRef = ref(db)
const users = [];

const createUser = ()=>{
    const email = "chinkhuslen123@gmail.com"
    const password = "1234567890"
    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user = userCredential.user;
        console.log(user);
    }).catch(err=>{
        console.log("err:",err)
    })
}

onChildChanged(ref(db, "sms/"),(snapshot)=>{
if(snapshot.exists()){
    alert("working aye");
}
})
function sendChat(){
    let sms = document.getElementById("inp").value;
    document.getElementById("inp").value = '';
    push(child(dbRef, "sms/"), {name:"User1",
        chat:sms
    }).then(()=>{
        users.push({name:"User1", chat:sms})
        draw();
    }).catch(err=>{
        console.log("err: ", err)
    })
}

function getUsers(){
    get(child(dbRef, "sms/")).then(snapshot=>{
        if(snapshot.exists()){
            snapshot.forEach((doc) => {
                users.push(doc.val())
            });
            draw();
        }
    }).catch(err=>console.log("DB-ERR", err))
    console.log("db ", db)
}

function draw(){
    const mainBody = document.getElementsByClassName("chatArea")[0];
    let list = '';
    users.forEach(item=>{
        if(item.name == "User1"){
            list+=
            `<div class="smsCon right">
            <div class="chatCon center">${item.chat}</div>
           <div class="userName center">Me</div>
       </div>`
        }else{
            list+=
            `<div class="smsCon left">
            <div class="userName center">${item.name}</div>
            <div class="chatCon center">${item.chat}</div>
        </div>`
        }
    })
    mainBody.innerHTML = list;
}

const btn = document.getElementsByTagName("button")[0];
btn.addEventListener('click',()=>{
    sendChat()
})
document.getElementById("inp").addEventListener("keypress", (event)=>{
    if(event.keyCode == 13){
        sendChat();
    }
})
getUsers()