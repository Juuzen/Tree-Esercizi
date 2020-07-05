function loadGarage() {

  // qua mi fetcho solo i brand
  fetchBrands().then((brandList) => {
    for (brand of brandList.Results) {
      var brandObj = {};
      brandObj["id"] = brand.MakeId;
      brandObj["name"] = brand.MakeName;
      brandObj["vehicles"] = [];
      garageList.push(brandObj);
    }
  });

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
  })
}
