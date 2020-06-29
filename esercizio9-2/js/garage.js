/*

Ci ritorna tutti i modelli di Car
https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json

Ci ritorna tutti i modelli dato l’ID della marca
https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/441?format=json 

*/

function getModels(brandID) {
  let model$ = fetch(VEHICLEURL + brandID + VEHICLEURLSUFFIX).then((res) =>
    res.json()
  );
  return model$;
}

function showModels(brandID) {
  let model$ = getModels(brandID).then((models) => models.Results);
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

      /*
      modelList = document.getElementById("brand-list-" + brand.MakeId);
      modelList.innerHTML = "";
      getModels(brand.MakeId).then((models) => {
        models.Results.forEach((mod) => {
          modelList.innerHTML += `<li>${mod.Model_Name}</li>`;
        });
      });
      */
    });
  });
}

showBrands();
