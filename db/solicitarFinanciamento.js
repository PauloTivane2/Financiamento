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
let btnSolicitar = document.getElementById("btnSolicitar")

let valor = document.getElementById("valor")
let parcelas = document.getElementById("parcelas")
let descricao = document.getElementById("descricao")

// Obter a data atual
let dataAtual = new Date();

// Guardar a data atual formatada
let dataAntigaFormatada = dataAtual.toISOString().split('T')[0];

// Adicionar 10 dias
let novaData = new Date(dataAtual);
novaData.setDate(novaData.getDate() + 10);

// Guardar a nova data formatada
let novaDataFormatada = novaData.toISOString().split('T')[0];

console.log("Data antiga:", dataAntigaFormatada);
console.log("Nova data:", novaDataFormatada);

let dados = {}

btnSolicitar.addEventListener("click", async (e)=>{
    e.preventDefault()
    if(logsdo){
        dados = ()=>{
            return {
                "valor": valor.value,
                "parcelas": parcelas.value,
                "descricao": descricao.value,
                "dataSoli": dataAntigaFormatada,
                "dataLimite": novaDataFormatada,
                "status": "null",
                "email": localStorage.getItem('username'),
                "senha": localStorage.getItem('senha')
            }
        }
        console.log(dados())
        if(dados()["valor"] == "" || dados()["parcelas"] == "" || dados()["descricao"] == ""){
            alert("Preencha todos os campos")
        }else{
            try {
                await addDoc(collection(db, 'solicitacoes'), {
                    valor: dados()["valor"],
                    parcelas: dados()["parcelas"],
                    descricao: dados()["descricao"],
                    dataSoli: dados()["dataSoli"],
                    dataLimite: dados()["dataLimite"],
                    status: dados()["status"],
                    email: dados()["email"],
                    senha: dados()["senha"]
                });
                console.log('Item adicionado com sucesso!');
                window.open("../beneficiario/painel.html", "_self")
                
            } catch (error) {
                console.error('Erro ao adicionar item: ', error);
            }
        }

    }
})