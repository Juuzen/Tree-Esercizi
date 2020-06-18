function Persona(name, surname, cf) {
  this.name = name;
  this.surname = surname;
  this.cf = cf;
}

function sendDataDB() {
  window.localStorage.setItem("contatti", JSON.stringify(anagrafica));
}

let anagrafica = [];
let p = new Persona("Valentino", "Rossi", "VR1");
let p2 = new Persona("Mario", "Bianchi", "MB2");

anagrafica.push(p);
anagrafica.push(p2);
