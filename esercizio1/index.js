const province = {
  Catania: ["Aci Castello", "Catania", "Aci Catena"],
  Napoli: ["Brusciano", "Acerra", "Napoli"],
  Milano: ["Milano", "Non saprei", "Bergamo"],
};

function getComuni(key) {
  return province[key];
}

function createSelect() {
  let province = document.getElementById("cityForm").value;
  let domComuni = document.getElementById("comuni");

  // creazione della select
  let selectComuni = document.createElement("select");
  selectComuni.classList.add("form-control", "mt-4");
  selectComuni.id = "comuni";

  getComuni(province).map((comune) => {
    let option = document.createElement("option");
    option.text = comune;
    option.value = comune;
    selectComuni.add(option);
  });

  // aggancio della select al div
  document.getElementById("contentSelectComuni").appendChild(selectComuni);

  // pulizia del control
  if (domComuni) {
    domComuni.remove();
  }
}
