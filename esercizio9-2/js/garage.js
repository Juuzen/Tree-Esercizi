/*

Ci ritorna tutti i modelli di Car
https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json

Ci ritorna tutti i modelli dato l’ID della marca
https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/441?format=json 

*/

function getBrands() {
  let brand$ = fetch(BRANDURL).then((res) => res.json());
  return brand$;
}

function showBrands() {
  let card = "";
  console.log(1);
  getBrands().then((brands) => {
    console.log(brands);

    brands.Results.forEach((brand) => {
      console.log(brand);
    })
    /*
    brands.Results.forEach((brand) => {
      card += `
      <div class="card">
        <div class="card-header" id="maserati">
          <h5 class="mb-0">
           <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Maserati
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <ul>
                    <li>Maserati 1</li>
                    <li>Maserati 2</li>
                  </ul>
                </div>
              </div>
            </div>
      `;
    });
*/
  });
}

showBrands();
