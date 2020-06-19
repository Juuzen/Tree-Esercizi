let anagrafica = [];
let peopleCounter = 0;

function Persona(name, surname, cf) {
  this.name = name;
  this.surname = surname;
  this.cf = cf;
}

function flushForms() {
  document.getElementById("formName").value = "";
  document.getElementById("formSurname").value = "";
  document.getElementById("formCF").value = "";
}

function flushSearch() {
  document.getElementById("foundContact").textContent = "";
  document.getElementById("resetSearchButton").disabled = true;
}

function updateCounter() {
  let counter = document.getElementById("contactCounter");
  peopleCounter = anagrafica.length;
  if (peopleCounter == 0) {
    counter.style.textShadow = "2px 2px 5px #ff0000";
  } else {
    counter.style.textShadow = "2px 2px 5px #00ff00";
  }
  counter.innerHTML = peopleCounter;
}

function searchContacts() {
  // Deve mostrare tutti gli elementi che matchano con la stringa
  let searchString = document.getElementById("searchForm").value;
  let foundContactsArray = anagrafica.filter((persona) => {
    return persona.cf.includes(searchString);
  });
}

function findContact(key) {
  // index indica la posizione nell'array del codice fiscale della persona da eliminare (resta -1 se il codice fiscale non è presente)
  let response = null;
  anagrafica.forEach((persona, index) => {
    if (persona.cf == key) {
      response = index;
      return;
    }
  });
  return response;
}

function showContact(persona, tagElement) {
  let textSpan = document.createElement("span");
  textSpan.innerHTML = "La persona cercata è:";
  tagElement.appendChild(textSpan);

  let contactCardDiv = document.createElement("div");
  contactCardDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "list-group-item",
    "contactCard"
  );
  tagElement.appendChild(contactCardDiv);

  let contactInfoList = document.createElement("ul");
  contactInfoList.classList.add("contactInfoList");
  contactCardDiv.appendChild(contactInfoList);

  for (let elem in persona) {
    let contactListItem = document.createElement("li");
    if (elem == "cf") {
      contactListItem.classList.add("cf-info");
    }
    contactListItem.innerHTML = persona[elem];
    contactInfoList.appendChild(contactListItem);
  }
}

function triggerSearch() {
  let cf = document.getElementById("searchForm").value;
  let foundContact = document.getElementById("foundContact");
  foundContact.textContent = "";
  let index = findContact(cf);
  if (index != null) {
    showContact(anagrafica[index], foundContact);
    document.getElementById("resetSearchButton").disabled = false;
  } else {
    alert("Non è presente nessuna persona con questo CF!");
  }
}

/* Rubrica */

function triggerDelete(cf) {
  let response = window.confirm(
    "Sei sicuro di voler cancellare la persona con CF: " + cf + "?"
  );
  if (response) {
    let index = findContact(cf);
    if (index != null) {
      deleteContact(index);
    } else {
      alert("E' successo un casino per cancellare questo contatto bro");
    }
  }
}

function createContact(persona, tagElement) {
  let contactCardDiv = document.createElement("div");
  contactCardDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "list-group-item",
    "contactCard"
  );
  tagElement.appendChild(contactCardDiv);

  let contactInfoList = document.createElement("ul");
  contactInfoList.classList.add("contactInfoList");
  contactCardDiv.appendChild(contactInfoList);

  for (let elem in persona) {
    let contactListItem = document.createElement("li");
    if (elem == "cf") {
      contactListItem.classList.add("cf-info");
    }
    contactListItem.innerHTML = persona[elem];
    contactInfoList.appendChild(contactListItem);
  }

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerHTML = "X";
  deleteButton.onclick = function () {
    triggerDelete(persona.cf);
  };
  contactCardDiv.appendChild(deleteButton);
}

function updateContactBook() {
  let contactBook = document.getElementById("contactBook");
  contactBook.textContent = "";
  showContactBook();
}

function showContactBook() {
  let contactBook = document.getElementById("contactBook");
  anagrafica.forEach((persona) => {
    createContact(persona, contactBook);
  });
}

function deleteContact(index) {
  // Cancellazione da anagrafica
  anagrafica.splice(index, 1);
  // Sync con il local storage
  window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
  // Update della rubrica
  updateContactBook();
  // Update del contatore
  updateCounter();
}

/* Local Storage */

function writeOnDB(name, surname, cf) {
  let persona = new Persona(name, surname, cf);
  anagrafica.push(persona);
  window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
  flushForms();
  if (document.getElementById("formCF").classList.contains("cf-error")) {
    document.getElementById("formCF").classList.remove("cf-error");
  }
  updateCounter();
  updateContactBook();
  alert("Inserimento effettuato!");
}

function sendDataDB() {
  // Si prendono i valori dai form
  let nameInput = document.getElementById("formName").value;
  let surnameInput = document.getElementById("formSurname").value;
  let cfInput = document.getElementById("formCF").value;

  // Validazione dei valori
  if (nameInput == "" || surnameInput == "" || cfInput == "") {
    alert("Tutti i campi sono obbligatori!");
  } else {
    // Controllo della presenza di elementi in anagrafica
    if (anagrafica.length > 0) {
      let found = false;
      // Controllo sui CF in anagrafica
      anagrafica.forEach((persona) => {
        if (persona.cf == cfInput) {
          found = true;
          return;
        }
      });
      if (!found) {
        // Nuovo inserimento
        writeOnDB(nameInput, surnameInput, cfInput);
      } else {
        alert("Esiste già una persona con questo CF!");
        if (!document.getElementById("formCF").classList.contains("cf-error")) {
          document.getElementById("formCF").classList.add("cf-error");
        }
      }
    } else {
      // Nuovo inserimento
      writeOnDB(nameInput, surnameInput, cfInput);
    }
  }
}

/* Funzioni legate al caricamento */

window.onload = () => {
  if (window.localStorage.getItem("contatti") != null) {
    let tempArray = JSON.parse(window.localStorage.getItem("contatti"));
    anagrafica = tempArray;
    updateCounter();
  }
  document.getElementById("contactCounter").innerHTML = peopleCounter;
  showContactBook();
};
