//Importando o db
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
    
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIrrwowbcuOGqUcvgPFEm3Dv59h9xTvPM",
    authDomain: "financiamento-a494c.firebaseapp.com",
    projectId: "financiamento-a494c",
    storageBucket: "financiamento-a494c.appspot.com",
    messagingSenderId: "963527610792",
    appId: "1:963527610792:web:832ed9e4ff205304ff4d9d",
    measurementId: "G-HTNJ5GP2KL"
  };

  // Initializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Referência ao Firestore
const db = getFirestore(app);

let dadosUser = document.querySelectorAll(".dadosUser")

let btnEdt = document.getElementById("btnEdt")

btnEdt.addEventListener("click", (e)=>{
    e.preventDefault()
    window.open("../beneficiario/editarInformacoes.html", "_self")
})

async function dados(senha, email) {
    const q = collection(db, "usuarios");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          if(senha == item["senha"] && email == item["email"]){
              console.log("logado")
             dadosUser[0].innerHTML = `<strong>Beneficiário:</strong> ${item["nome"]}`
          }
      })

      
    })
  }

  async function dados2(senha, email) {
    const q = collection(db, "solicitacoes");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          if(senha == item["senha"] && email == item["email"]){
              console.log("logado")
             dadosUser[1].innerHTML = `<strong>Valor Financiado:</strong> ${item["valor"]}`
             dadosUser[2].innerHTML = ""
             dadosUser[3].innerHTML = `<strong>Próximo Vencimento:</strong> ${item["dataLimite"]}`
          }
      })

      
    })
  }

document.getElementById('logoutButton').addEventListener('click', function() {

    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('senha');
    
    window.open("../entrarRegistrar/login.html")
});

console.log(localStorage.getItem('isLoggedIn'))

if (localStorage.getItem('isLoggedIn') == 'null') {
    window.open("../entrarRegistrar/login.html")
    console.log("jdska")
} else {
    console.log(localStorage.getItem('username'))
    dados(localStorage.getItem('senha'), localStorage.getItem('username'))
    dados2(localStorage.getItem('senha'), localStorage.getItem('username'))
}

let pagamento = document.getElementById("pagamento")

pagamento.addEventListener("click", ()=>{
  window.open("../beneficiario/efetuarPagamento.html", "_self")
})