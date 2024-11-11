// Configuração do Firebase e inicialização
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIrrwowbcuOGqUcvgPFEm3Dv59h9xTvPM",
    authDomain: "financiamento-a494c.firebaseapp.com",
    projectId: "financiamento-a494c",
    storageBucket: "financiamento-a494c.appspot.com",
    messagingSenderId: "963527610792",
    appId: "1:963527610792:web:832ed9e4ff205304ff4d9d",
    measurementId: "G-HTNJ5GP2KL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referências aos elementos do DOM
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let entrar = document.getElementById("entrar");
let c = 0;

// Exibir mensagem de erro no modal do Bootstrap
function exibirErroModal(mensagem) {
    document.getElementById("erroMensagem").textContent = mensagem;
    const modal = new bootstrap.Modal(document.getElementById('erroModal'));
    modal.show();
}

// Função para verificar os dados do usuário no Firestore
async function dados() {
    const q = collection(db, "usuarios");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        c = 0; // Reinicia o contador a cada verificação
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            if (senha.value === item["senha"] && email.value === item["email"]) {
                c = 1;
                localStorage.setItem('username', item["email"]);
                localStorage.setItem('senha', item["senha"]);
                localStorage.setItem('isLoggedIn', 'true');
                window.open("../beneficiario/painel.html", "_self");
            }
        });
        if (c === 0) {
            exibirErroModal("Email ou Senha Inválidos!");
        }
    });
}

// Evento de clique no botão de entrar
entrar.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "admin@gmail.com" && senha.value === "123") {
        window.open("../gestor/painelGestor.html", "_self");
    } else {
        dados();
    }
});

// Redirecionamento se o usuário já estiver logado
if (localStorage.getItem('isLoggedIn')) {
    window.open("../beneficiario/painel.html", "_self");
}
