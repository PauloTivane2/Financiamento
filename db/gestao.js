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

let tabelaSoli = document.getElementById("tabelaSoli")
let tabelaAceito = document.getElementById("tabelaAceito")
let idSoli = []
let sO = 0
async function dados() {
    tabelaSoli.innerHTML =""
    tabelaAceito.innerHTML=""
    const q = collection(db, "solicitacoes");

    // Promessa para aguardar o carregamento dos dados
    await new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let item = doc.data()
                if(item["status"] == "null"){
                    idSoli[sO]=doc.id
                    sO++
                tabelaSoli.innerHTML+=`
                    <tr>
                    <td>${item["email"]}</td>
                    <td>${item["valor"]}</td>
                    <td>${item["dataSoli"]}</td>
                    <td>Pendente</td>
                    <td>
                    <button class="btn btn-success btn-sm aprovar">Aprovar</button>
                    <button class="btn btn-danger btn-sm rejeitar">Rejeitar</button>
                    
                    </td>
                </tr>
                `
                }else if(item["status"] == "aceito"){
                    tabelaAceito.innerHTML += `
                        <tr>
                            <td>${item["email"]}</td>
                            <td>${item["valor"]}</td>
                            
                        </tr>
                    `
                }
               
            });
            resolve(); // Resolve a promessa após o forEach concluir
        });
    });

    let aprovar = document.querySelectorAll(".aprovar");
    for (let i = 0; i < aprovar.length; i++) {
        console.log(i);
        aprovar[i].addEventListener("click", (e) => {
            e.preventDefault();
            //alert(i);
            console.log(idSoli[i])
            updateItem(idSoli[i], "aceito")
             
        });
    }

    let rejeitar = document.querySelectorAll(".rejeitar");
    for (let i = 0; i < rejeitar.length; i++) {
        console.log(i);
        rejeitar[i].addEventListener("click", (e) => {
            e.preventDefault();
            //alert(i);
            console.log(idSoli[i])
            updateItem(idSoli[i], "rejeitado")
             
        });
    }
}

async function dados2(nome, senha) {
    const q = collection(db, "usuarios");

    // Promessa para aguardar o carregamento dos dados
    await new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let item = doc.data()
                if(item["nome"] == nome, item["senha"] == senha){
                    console.log(item)
                    dtL[0].innerHTML = `<strong>Nome do Usuário:</strong> ${item["nome"]}`
                    
                }
               
            });
            resolve(); // Resolve a promessa após o forEach concluir
        });
    });
}


dados()
async function updateItem(itemId, st) {

    try {
        const docRef = doc(db, "solicitacoes", itemId);
        await updateDoc(docRef, { status: st });
        //alert("Valor atualizado com sucesso!");
        window.open("../gestor/gestaoBeneficiarios.html", "self")
    } catch (error) {
        console.error("Erro ao atualizar o valor:", error);
        alert("Erro ao atualizar o valor.");
    }
  }
{/* <button class="btn btn-secondary btn-sm">Detalhes</button> <!--Pagina detalhes financiamento--> */}