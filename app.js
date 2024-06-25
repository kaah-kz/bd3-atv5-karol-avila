// Importação do SDK do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB99N3a_xoGfXEKPmb9e_ay4MtLhEW4LRA",
    authDomain: "bd3-nosql-karol.firebaseapp.com",
    projectId: "bd3-nosql-karol",
    storageBucket: "bd3-nosql-karol.appspot.com",
    messagingSenderId: "1030059942523",
    appId: "1:1030059942523:web:3637a325bec821a4b8f8de",
    measurementId: "G-WVBV4GCD6H"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

// Inicialização da conexão com o Firestore
const db = firebase.firestore();

const studentList = document.querySelector('#student-list');

function renderStudent(doc) {
    let li = document.createElement('li');
    let nome = document.createElement('span');
    let idade = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    nome.textContent = doc.data().nome;
    idade.textContent = doc.data().idade;
    cross.textContent = 'X';

    li.appendChild(nome);
    li.appendChild(idade);
    li.appendChild(cross);

    studentList.appendChild(li);

    // Excluir aluno
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('alunos').doc(id).delete().then(() => {
            let liToRemove = document.querySelector(`li[data-id='${id}']`);
            studentList.removeChild(liToRemove);
        }).catch((error) => {
            console.error("Erro ao excluir documento: ", error);
        });
    });
}

// Listar alunos
db.collection('alunos').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderStudent(doc);
    });
});

// Adicionar um novo aluno
const form = document.querySelector('#add-student-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('alunos').add({
        nome: form.nome.value,
        idade: form.idade.value
    }).then(() => {
        form.nome.value = '';
        form.idade.value = '';
        window.location.reload();
    }).catch((error) => {
        console.error("Erro ao adicionar documento: ", error);
    });
});
