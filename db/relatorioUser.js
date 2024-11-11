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
let pagamentoNext = document.getElementById("pagamentoNext")
pagamentoNext.innerHTML = ""
//dataPay

let valorTotal = document.getElementById("valorTotal")
let parcelasK = document.querySelectorAll(".parcelasK")
let pagamentoHistorico = document.getElementById("pagamentoHistorico")

async function dados(senha, email) {
    pagamentoHistorico.innerHTML = `
         <thead>
            <tr>
                <th scope="col">Data de Pagamento</th>
                <th scope="col">Valor Pago</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
    
    `
    const q = collection(db, "pagamento");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          console.log(item)
          if(senha == item["senha"] && email == item["email"]){
            // console.log("Certo: "+item)
            //valorTotal.textContent = `${item["valor"]}`
            parcelasK[0].textContent = `${item["pagamentovezes"]}`
            pagamentoHistorico.innerHTML += `
            <tr>
                <td>${item["dataPay"]}</td>
                <td>${item["valorParcela"]}</td>
                <td>Pago</td>
            </tr>
            `
          }
      })

      
    })
  }

  async function dados2(senha, email) {
    
    const q = collection(db, "solicitacoes");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          console.log(item)
          if(senha == item["senha"] && email == item["email"]){
            console.log("Certo: ")
            console.log(item)
            valorTotal.textContent = `${item["valor"]},00MT`
            parcelasK[1].textContent = `${item["parcelas"]}`
           
          }
      })

      
    })
  }

let logado = localStorage.getItem("isLoggedIn")
if(logado){
    console.log(localStorage.getItem("username"))
    console.log(localStorage.getItem("senha"))
    dados(localStorage.getItem("senha"), localStorage.getItem("username"))
    dados2(localStorage.getItem("senha"), localStorage.getItem("username"))

}