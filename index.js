// Utiliza uma URL de CDN para carregar o módulo de forma rápida sem precisar instalar localmente.

// Importa o método 'initializeApp' da biblioteca Firebase para inicializar o app com as configurações fornecidas.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// Importa os métodos 'getDatabase', 'ref' e 'push' da biblioteca Firebase para acessar e manipular o banco de dados em tempo real.
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.13.2/firebase-database.js";

/**
 * @description API do firebase
 */
const appSettings = {
  databaseURL: "https://carrinho-f1fb2-default-rtdb.firebaseio.com/",
};

// Inicializa o firebase.
const app = initializeApp(appSettings);
// Obtém uma referência ao serviço de banco de dados em tempo real.
const database = getDatabase(app);
// Cria uma referência para "Lista de Compras" no banco de dados Firebase
const shoppingListInDB = ref(database, "Lista_de_Compras");

// Declaração de variável
const btn = document.getElementById("add-button");
const input = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

onValue(shoppingListInDB, function (snapshot) {
  let data = snapshot.val();

  if (data) {
    let itemsArray = Object.entries(data);
    clearShoppingList();

    for (let index = 0; index < itemsArray.length; index++) {
      let currentItem = itemsArray[index];
      appendItemToShoppingList(currentItem);
    }
  } else {
    clearShoppingList();
    console.log("Nenhum item encontrado na lista de compras.");
  }
});

// Funções
function clearInputField() {
  input.value = "";
  input.focus();
}

function appendItemToShoppingList(value) {
  let newElement = document.createElement("li");
  newElement.textContent = value[1];

  newElement.addEventListener("click", function () {
    let exataLocalizacaoDoItemNoBD = ref(
      database,
      `Lista_de_Compras/${value[0]}`
    );
    remove(exataLocalizacaoDoItemNoBD);
  });

  shoppingList.append(newElement);
}

function clearShoppingList() {
  shoppingList.innerHTML = "";
  shoppingList.focus();
}

// Eventos
btn.addEventListener("click", function () {
  let inputValue = input.value;

  push(shoppingListInDB, inputValue)
    .then(() => {
      console.log("Cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error.message);
    });

  clearInputField();
});

// Implementando o favicon
const link = document.createElement("link");
link.rel = "icon";
link.type = "image/x-icon";
link.href = "./assets/favicon/JS.png";
document.head.appendChild(link);
