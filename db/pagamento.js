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

let dados = {}

let logsdo = localStorage.getItem('isLoggedIn')

let valorParcela = document.getElementById("valorParcela")
let metodoPagamento = document.getElementById("metodoPagamento")
let nomeTitular = document.getElementById("nomeTitular")
let numeroCartao = document.getElementById("numeroCartao")
let cvv = document.getElementById("cvv")
let validadeCartao = document.getElementById("validadeCartao")
let btnConfirmar = document.getElementById("btnConfirmar")
//pagamentovezes
let pagamentoQuanti = 0
const hoje = new Date();
const dataFormatada = hoje.toISOString().split('T')[0];
console.log(dataFormatada);

async function parcela(senha, email) {
    
    const q = collection(db, "pagamento");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
          const item = doc.data();
          console.log(item)
          if(senha == item["senha"] && email == item["email"]){
            console.log(`vezes de parcela: ${item["pagamentovezes"]}`)
            pagamentoQuanti = Number(item["pagamentovezes"])+1
            console.log("Pagamento quanti: "+pagamentoQuanti)
          }
      })

      
    })
  }
console.log(logsdo)
console.log("Tela pagamento")
parcela(localStorage.getItem("senha"), localStorage.getItem("username"))

btnConfirmar.addEventListener("click", async (e)=>{
    e.preventDefault()
   
    if(logsdo){
        //dados(localStorage.getItem('senha'), localStorage.getItem('username'))
        dados = ()=>{
            return {
                "valorParcela": valorParcela.value,
                "metodoPagamento": metodoPagamento.value,
                "nomeTitular": nomeTitular.value,
                "numeroCartao": numeroCartao.value,
                "validadeCartao": validadeCartao.value,
                "cvv": cvv.value,
                "email": localStorage.getItem('username'),
                "senha": localStorage.getItem('senha')
            }
        }

        if(dados()["valorParcela"] == "" || dados()["metodoPagamento"] == "" || dados()["nomeTitular"] == "" || dados()["numeroCartao"] == "" || dados()["validadeCartao"] == "" || dados()["cvv"] == ""){
            alert("Preencha todos os campos")
        }else{
            try {
                await addDoc(collection(db, 'pagamento'), {
                    valorParcela: dados()["valorParcela"],
                    metodoPagamento: dados()["metodoPagamento"],
                    nomeTitular: dados()["nomeTitular"],
                    numeroCartao: dados()["numeroCartao"],
                    validadeCartao: dados()["validadeCartao"],
                    cvv: dados()["cvv"],
                    email: dados()["email"],
                    senha: dados()["senha"],
                    dataPay: dataFormatada,
                    pagamentovezes: pagamentoQuanti
                });
                console.log('Item adicionado com sucesso!');
                window.open("../beneficiario/painel.html", "_self")
                
            } catch (error) {
                console.error('Erro ao adicionar item: ', error);
            }
        }


    }
})


