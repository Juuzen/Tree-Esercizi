function Persona(name, surname, cf) {
  this.name = name;
  this.surname = surname;
  this.cf = cf;
}

function writeOnDB(name, surname, cf) {
  let persona = new Persona(name, surname, cf);
  anagrafica.push(persona);
  window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
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
          alert("Esiste già una persona con questo CF!");
          return;
        }
      });
      if (!found) {
        // Nuovo inserimento
        writeOnDB(nameInput, surnameInput, cfInput);
        alert("Inserimento effettuato!");
      }
    } else {
      // Nuovo inserimento
      writeOnDB(nameInput, surnameInput, cfInput);
      alert("Inserimento effettuato!");
    }
    document.getElementById("formName").value = "";
    document.getElementById("formSurname").value = "";
    document.getElementById("formCF").value = "";
  }
}

let anagrafica = [];

window.onload = () => {
  if (window.localStorage.getItem("contatti") != null) {
    let tempArray = JSON.parse(window.localStorage.getItem("contatti"));
    anagrafica = tempArray;
  }
};
