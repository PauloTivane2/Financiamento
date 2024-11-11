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

// Função para obter o parâmetro 'id' da URL
function obterIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); // Obtem o valor de 'id' da URL
    return id;
}

// Chame a função e atribua o valor do 'id' a uma variável
const id = obterIdDaUrl();
console.log(id); // Exibe o valor do id no console (ou utilize como preferir)

let dtL = document.querySelectorAll(".dtL")
async function dados() {
    const q = collection(db, "solicitacoes");

    // Promessa para aguardar o carregamento dos dados
    await new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let item = doc.data()
                if(doc.id == id){
                    dados2(item["nome"], item["senha"])
                    console.log(item)
                    dtL[1].innerHTML = `<strong>Valor Solicitado:</strong> ${item["valor"]}`
                    dtL[2].innerHTML = `<strong>Número de Parcelas::</strong> ${item["parcelas"]}`
                    dtL[3].innerHTML = `${item["descricao"]}`
                }
               
            });
            resolve(); // Resolve a promessa após o forEach concluir
        });
    });
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



