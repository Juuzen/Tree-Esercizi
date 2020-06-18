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

function writeOnDB(name, surname, cf) {
  let persona = new Persona(name, surname, cf);
  anagrafica.push(persona);
  window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
  flushForms();
  if (document.getElementById("formCF").classList.contains("cf-error")) {
    document.getElementById("formCF").classList.remove("cf-error");
  }
  updateCounter();
  alert("Inserimento effettuato!");
}

function updateCounter() {
  peopleCounter = anagrafica.length;
  document.getElementById("contactCounter").innerHTML = peopleCounter;
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

window.onload = () => {
  if (window.localStorage.getItem("contatti") != null) {
    let tempArray = JSON.parse(window.localStorage.getItem("contatti"));
    anagrafica = tempArray;
    peopleCounter = anagrafica.length;
  }
  document.getElementById("contactCounter").innerHTML = peopleCounter;
};
