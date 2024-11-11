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

let logsdo = localStorage.getItem('isLoggedIn')

let totValor = document.getElementById("totValor")

let nomeBeneficiario = document.getElementById("nomeBeneficiario")
let idFinanciamento = document.getElementById("idFinanciamento")
let soliApro = document.getElementById("soliApro")
let soliReje = document.getElementById("soliReje")

let soliciQuanti = 0
let soliReJei= 0 
let valorTot = 0
let userSoli = []

async function solicitacoes() {
    financiamentoRel.innerHTML = `
        <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Valor Solicitado</th>
                <th scope="col">Data da Solicitação</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
    `

    beniRel.innerHTML = `
    <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Valor Financiado</th>
                <th scope="col">Parcelas</th>
                <th scope="col">Vencimento</th>
              </tr>
            </thead>
`
    const q = collection(db, "solicitacoes");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            
           console.log(item)

           if(item["status"] == "aceito"){
                valorTot += Number(item["valor"])
                soliciQuanti+=1
                totValor.textContent = `${valorTot},00 mt`
                soliApro.textContent = `${soliciQuanti} solicitações`
                financiamentoRel.innerHTML +=`
                     <tr>
                        <td>${item["email"]}</td>
                        <td>${item["valor"]}</td>
                        <td>${item["dataSoli"]}</td>
                        <td>Aprovada</td>
                    </tr>
                `

                beniRel.innerHTML += `
          
             <tr>
                <td>${item["email"]}</td>
                <td>${item["valor"]}</td>
                <td>${item["parcelas"]}</td>
                <td>${item["dataLimite"]}</td>
              </tr>
          
          `
           }else{
            soliReJei++
            soliReje.textContent = `${soliReJei} solicitações`
            financiamentoRel.innerHTML +=`
                    <tr>
                    <td>${item["email"]}</td>
                    <td>${item["valor"]}</td>
                    <td>${item["dataSoli"]}</td>
                    <td style ="color: red">Rejeitada</td>
                </tr>
            `
           }
        })
    })
}


solicitacoes()

async function pagamento() {
    beniRel.innerHTML = `
        <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Valor Solicitado</th>
                <th scope="col">Data da Solicitação</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
    `
    const q = collection(db, "pagamento");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          console.log(item)
          beniRel.innerHTML += `
          
             <tr>
                <th scope="col">Email</th>
                <th scope="col">Valor Financiado</th>
                <th scope="col">Parcelas Restantes</th>
                <th scope="col">Status</th>
              </tr>
          
          `
      })

      
    })
  }


// if(logsdo){
//     dados2(localStorage.getItem('senha'), localStorage.getItem('username'))
// }