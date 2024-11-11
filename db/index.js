import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBIrrwowbcuOGqUcvgPFEm3Dv59h9xTvPM",
    authDomain: "financiamento-a494c.firebaseapp.com",
    projectId: "financiamento-a494c",
    storageBucket: "financiamento-a494c.appspot.com",
    messagingSenderId: "963527610792",
    appId: "1:963527610792:web:832ed9e4ff205304ff4d9d",
    measurementId: "G-HTNJ5GP2KL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência aos campos do formulário
let nome = document.getElementById("nome");
let data_nascimento = document.getElementById("data-nascimento");
let profissao = document.getElementById("profissao");
let morada = document.getElementById("morada");
let numero_celular = document.getElementById("numero-celular");
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let confirma_senha = document.getElementById("confirma-senha");
let btnCadastrar = document.getElementById("btnCadastrar");

// Função para exibir o modal de erro
function showError(errors) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = errors.join("<br>"); // Concatena os erros com <br> para pular linha
    $('#errorModal').modal('show'); // Exibe o modal
}

async function addUser() {
    const errors = [];
    
    // Validação do Nome
    const nomeValue = nome.value;
    const nomePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nomeValue || !nomePattern.test(nomeValue) || nomeValue.split(" ").length > 3) {
        errors.push("Nome inválido, não pode ultrapassar 3 palavras e deve conter apenas letras.");
    }

    // Validação da Data de Nascimento
    const dataNascimento = new Date(data_nascimento.value);
    const age = new Date().getFullYear() - dataNascimento.getFullYear();
    if (isNaN(dataNascimento.getTime()) || age < 18 || age > 70) {
        errors.push("Data de nascimento inválida / Menor de idade / Idade Superior a 70 anos.");
    }

    // Validação da Profissão
    const profissaoValue = profissao.value;
    if (!nomePattern.test(profissaoValue) || profissaoValue.split(" ").length > 3) {
        errors.push("Profissão inválida, não pode ultrapassar 3 palavras e deve conter apenas letras.");
    }

    // Validação da Morada
    const moradaValue = morada.value;
    const moradaPattern = /^[a-zA-Z0-9\s]+$/;
    if (!moradaPattern.test(moradaValue) || moradaValue.split(" ").length > 3) {
        errors.push("Morada inválida, não pode ultrapassar 3 palavras e deve conter apenas letras.");
    }

    // Validação do Email
    const emailValue = email.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        errors.push("Email inválido.");
    }

    // Validação do Número de Celular
    const celularValue = numero_celular.value;
    const celularPattern = /^(82|83|84|85|86|87)\d{7}$/;
    if (!celularPattern.test(celularValue)) {
        errors.push("Número de celular inválido.");
    }

    // Validação de Senha e Confirmação de Senha
    const senhaValue = senha.value;
    const confirmaSenhaValue = confirma_senha.value;
    if (senhaValue.length < 6 || senhaValue.length > 15 || !/\d/.test(senhaValue) || senhaValue !== confirmaSenhaValue) {
        errors.push("A senha deve ter entre 6 e 15 caracteres, incluir pelo menos um número, e coincidir com a confirmação de senha.");
    }

    // Verificar se o email já existe
    const querySnapshot = await getDocs(query(collection(db, "usuarios"), where("email", "==", emailValue)));
    if (!querySnapshot.empty) {
        errors.push("O email já está registrado.");
    }
    
    // Validar se todos os campos foram preenchidos
    if (!nomeValue || !dataNascimento || !profissaoValue || !moradaValue || !celularValue || !emailValue || !senhaValue || !confirmaSenhaValue) {
        errors.push("Por favor, preencha todos os campos.");
    }

    // Se houver erros, mostrar todos no modal
    if (errors.length > 0) {
        showError(errors); // Passar o array de erros para a função showError
        return;
    }

    // Adicionar usuário no Firestore
    try {
        await addDoc(collection(db, 'usuarios'), {
            nome: nome.value,
            data_nascimento: data_nascimento.value,
            profissao: profissao.value,
            morada: morada.value,
            numero_celular: numero_celular.value,
            email: email.value,
            senha: senha.value
        });

        console.log('Item adicionado com sucesso!');
        window.open("../entrarRegistrar/login.html", "_self");

    } catch (error) {
        console.error('Erro ao adicionar item: ', error);
        showError(["Erro ao cadastrar, tente novamente mais tarde."]);
    }
}

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    addUser();
});
