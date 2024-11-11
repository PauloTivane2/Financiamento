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

let tabela = document.getElementById("tabela")
let dataValor = async (senha, email)=>{
    const q = collection(db, "solicitacoes");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            if(item["senha"] == senha && item["email"] == email){
                return{
                    "valor": item["valor"],
                    "data": item["dataLimite"]
                }
            }
            return{
                "valor": "Nome",
                "data": "0"
            }
        })
    })
}

let idCol = []
let c=0
async function dados() {
    tabela.innerHTML = "";
    const q = collection(db, "solicitacoes");

    // Promessa para aguardar o carregamento dos dados
    await new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                idCol[c] = doc.id
                c++
                const item = doc.data();
                tabela.innerHTML += `
                <tr>
                  <td>${item["email"]}</td>
                  <td>${item["valor"]}</td>
                  <td>${item["dataLimite"]}</td>
                  <td><button class="btn btn-info btn-sm btnVisualizar">Visualizar</button></td>
                </tr>
               `;
            });
            resolve(); // Resolve a promessa após o forEach concluir
        });
    });

    // Após o carregamento dos dados, capturar e adicionar eventos aos botões
    let btnVisualizar = document.querySelectorAll(".btnVisualizar");
    for (let i = 0; i < btnVisualizar.length; i++) {
        console.log(i);
        btnVisualizar[i].addEventListener("click", (e) => {
            e.preventDefault();
            //alert(i);
            console.log(idCol[i])
            window.location.href = `detalhesFinanciamento.html?id=${idCol[i]}`
        });
    }
}


dados()

console.log(dataValor("87654321", "mateus@gmail.com"))


{/* <td>8 de 24</td> */}