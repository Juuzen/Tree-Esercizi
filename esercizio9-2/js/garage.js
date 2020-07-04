const BRANDURL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";
const VEHICLEURL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/fetchModelsForMakeId/";
const VEHICLEURLSUFFIX = "?format=json";

const LS = window.localStorage;
var garageList = [];

redrawGarageTable = () => {};

loadGarage = () => {
  if (LS.getItem("rentals") === null) {
    // mi costruisco la garageList
    garageList = getBrands().then((brandList) => {
      let garage = [];
      for (brand of brandList.Results) {
        var brandObj = {};
        brandObj["id"] = brand.MakeId;
        brandObj["name"] = brand.MakeName;
        brandObj["vehicles"] = fetchModels(brand.MakeId).then((modelList) => {
          console.log(modelList);
        });

        /*
        for (model in modelList) {
          let modelObj = {};
          modelObj["id"] = model.Model_Id;
          modelObj["name"] = model.Model_Name;
          modelObj["rentedBy"] = "";
          modelObj["rentDate"] = "";
          brandObj["vehicles"].push(modelObj);
        }
        */

        //garage.push(brandObj);
      }
      return garage;
    });

    //mi salvo la garageList nel localStorage
    //LS.setItem("rentals", JSON.stringify(garageList));
  } else {
    //garageList = JSON.parse(LS.getItem("rentals"));
  }
  //redrawGarageTable();
};

function fetchModels(brandID) {
  let model$ = fetch(VEHICLEURL + brandID + VEHICLEURLSUFFIX).then((res) =>
    res.json()
  );
  return model$;
}

function showModels(brandID) {
  let model$ = fetchModels(brandID).then((models) => models.Results);
  return model$;
}

function getBrands() {
  let brand$ = fetch(BRANDURL).then((res) => res.json());
  return brand$;
}

function showBrands() {
  const accordion = document.getElementById("car-brands");
  let card = "";
  getBrands().then((brands) => {
    brands.Results.forEach(async function (brand) {
      card += `
      <div class="card">
      <div class="card-header" id="heading${brand.MakeId}">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${brand.MakeId}" aria-expanded="true" aria-controls="collapse-${brand.MakeId}">
          ${brand.MakeName}
          </button>
        </h5>
      </div>
  
      <div id="collapse-${brand.MakeId}" class="collapse" aria-labelledby="heading${brand.MakeId}" data-parent="#car-brands">
        <div class="card-body">
          <ul id="brand-list-${brand.MakeId}"></ul>
        </div>
      </div>
    </div>
      `;

      accordion.innerHTML = card;

      let brandModels = await showModels(brand.MakeId);
      modelList = document.getElementById("brand-list-" + brand.MakeId);
      modelList.innerHTML = "";
      brandModels.forEach((model) => {
        modelList.innerHTML += `<li>${model.Model_Name}</li>`;
      });
    });
  });
}
