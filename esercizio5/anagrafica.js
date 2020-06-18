function Persona(name, surname, cf) {
  this.name = name;
  this.surname = surname;
  this.cf = cf;
}

function sendDataDB() {
  let nameInput = document.getElementById("formName").value;
  let surnameInput = document.getElementById("formSurname").value;
  let cfInput = document.getElementById("formCF").value;
  //window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
  console.log(nameInput + " " + surnameInput + " " + cfInput);
}

let anagrafica = [];

//let p = new Persona("Valentino", "Rossi", "VR1");
//let p2 = new Persona("Mario", "Bianchi", "MB2");
//anagrafica.push(p);
//anagrafica.push(p2);
