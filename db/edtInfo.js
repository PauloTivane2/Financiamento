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

let nome = document.getElementById("nome")
let data_nascimento = document.getElementById("data-nascimento")
let profissao = document.getElementById("profissao")
let morada = document.getElementById("morada")
let numero_celular = document.getElementById("numero-celular")
let emails = document.getElementById("email")
let senhas = document.getElementById("senha")
let confirma_senha = document.getElementById("confirma-senha")

let btnCadastrar = document.getElementById("btnCadastrar")

let idItem = "n"

async function dados2(senha, email) {
    const q = collection(db, "usuarios");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          
          if(senha == item["senha"] && email == item["email"]){
              console.log("logado")
              console.log(item)
              nome.value = item["nome"]
              data_nascimento.value = item["data_nascimento"]
              profissao.value = item["profissao"]
              morada.value = item["morada"]
              numero_celular.value = item["numero_celular"]
              data_nascimento.value = item["data_nascimento"]
              emails.value = item["email"]
              senhas.value = item["senha"]
              confirma_senha.value = item["senha"]

              let dados = ()=>{
                return {
                    "nome": nome.value,
                    "data_nascimento": data_nascimento.value,
                    "profissao": profissao.value,
                    "morada": morada.value,
                    "numero_celular": numero_celular.value,
                    "email": email.value,
                    "senha": senha.value
                }
            }

              if(dados()["nome"] == "" || dados()["data_nascimento"] == "" || dados()["profissao"] == "" || dados()["morada"] == "" || dados()["numero_celular"] == "" || dados()["email"] == "" || dados()["senha"] == ""){
                alert("Preencha todos os dados")
              }else{
                console.log(doc.id)
                idItem = doc.id
              }
          }
      })

      
    })
  }

  let btnUpdate = document.getElementById("btnUpdate")

  btnUpdate.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("Id: "+idItem)
    if(idItem!="n"){
      updateItem(idItem)
    }
  })
if(logsdo){
    dados2(localStorage.getItem('senha'), localStorage.getItem('username'))
}else{
    window.open("../entrarRegistrar/login.html")
}

async function updateItem(itemId) {

  try {
      await updateDoc(doc(db, "usuarios", itemId), {
        nome: nome.value,
        data_nascimento: data_nascimento.value,
        profissao: profissao.value,
        morada: morada.value,
        numero_celular: numero_celular.value,
        email: emails.value,
        senha: senhas.value
      });
      console.log("Item atualizado com sucesso!");
      window.open("../beneficiario/painel.html", "_self")
  } catch (error) {
      console.error("Erro ao atualizar item: ", error);
  }
}