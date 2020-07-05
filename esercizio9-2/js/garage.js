const VEHICLE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles/";
const BRAND_URL = "GetMakesForVehicleType/car?format=json";
const MODEL_URL = "GetModelsForMakeId/";
const MODEL_URLSUFFIX = "?format=json";

const LS = window.localStorage;
var garageList = [];

function redrawGarageTable() {
  const accordion = document.getElementById("car-brands");

  garageList.forEach((brand) => {
    accordion.innerHTML += `
      <div class="card">
        <div class="card-header" id="heading${brand.id}">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${brand.id}" aria-expanded="true" aria-controls="collapse-${brand.id}">
      ${brand.name}
      </button>
    </h5>
  </div>

  <div id="collapse-${brand.id}" class="collapse" aria-labelledby="heading${brand.id}" data-parent="#car-brands">
    <div class="card-body">
      <ul id="brand-list-${brand.id}"></ul>
    </div>
  </div>
</div>
  `;

    brand.vehicles.forEach((model) => {
      modelList = document.getElementById("brand-list-" + brand.id);
      modelList.innerHTML += `<li>${model.name}</li>`;
    });
  });
}

async function loadGarage2() {
  // qua mi fetcho solo i brand
  await fetchBrands().then((brandList) => {
    for (brand of brandList.Results) {
      var brandObj = {};
      brandObj["id"] = brand.MakeId;
      brandObj["name"] = brand.MakeName;
      brandObj["vehicles"] = [];
      garageList.push(brandObj);
    }
  });

  let promArray = garageList.map(function(elem, index) {
    return new Promise()
  })

  // qua mi fetcho solo i modelli
  garageList.forEach(brand => {
    fetchModels(brand.id).then((modelList) => {
      for (model of modelList.Results) {
        let modelObj = {};
        modelObj["id"] = model.Model_ID;
        modelObj["name"] = model.Model_Name;
        modelObj["rentedBy"] = "";
        modelObj["rentDate"] = "";
        brand.vehicles.push(modelObj);
      }
    });
  });

  LS.setItem("rentals", JSON.stringify(garageList));
}

async function loadGarage() {
  if (LS.getItem("rentals") === null) {
    await fetchBrands().then(async (brandList) => {
      for (brand of brandList.Results) {
        var brandObj = {};
        brandObj["id"] = brand.MakeId;
        brandObj["name"] = brand.MakeName;
        brandObj["vehicles"] = [];

        await fetchModels(brand.MakeId).then((modelList) => {
          for (model of modelList.Results) {
            let modelObj = {};
            modelObj["id"] = model.Model_ID;
            modelObj["name"] = model.Model_Name;
            modelObj["rentedBy"] = "";
            modelObj["rentDate"] = "";
            brandObj["vehicles"].push(modelObj);
          }
        });
        garageList.push(brandObj);
      }
    });
    LS.setItem("rentals", JSON.stringify(garageList));
  } else {
    garageList = JSON.parse(LS.getItem("rentals"));
  }
  redrawGarageTable();
}

function fetchModels(brandID) {
  let model$ = fetch(
    VEHICLE_URL + MODEL_URL + brandID + MODEL_URLSUFFIX
  ).then((res) => res.json());
  return model$;
}

function fetchBrands() {
  let brand$ = fetch(VEHICLE_URL + BRAND_URL).then((res) => res.json());
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
