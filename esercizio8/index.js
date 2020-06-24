const serverURL = "http://localhost:3000/";
const usersURL = "users/";
const albumURL = "albums/";
const photosURL = "photos/";

function getPhotos(albumId) {
  console.log(albumId);
}

async function getAlbum() {
  let selectUser = document.getElementById("users");
  let userID = selectUser.value;
  let name = selectUser.options[selectUser.options.selectedIndex].innerText;
  document.getElementById("userSelected").textContent = name;

  let albums$ = await fetch(
    serverURL + usersURL + userID + "/" + albumURL
  ).then((response) => response.json());
  let tagCol = "";
  // l'arrow function è async poiché dobbiamo attendere che il server
  // abbia mandato le informazioni delle foto
  albums$.forEach(async (album) => {
    // ci ricaviamo gli url di tutte le foto di ogni album
    // questa variabile, per evitare l'annidamento dei then, deve essere await
    // quindi la funzione chiamante deve essere await (ossia l'arrow function)
    let photos$ = await fetch(
      serverURL + albumURL + album.id + "/" + photosURL
    ).then((response) => response.json());

    // questo è l'array degli url dei thumbnail tutte le foto dell'album
    let photos = [];
    photos$.forEach((photo, index) => {
      if (index == 0) {
        // pusha l'url del thumbnail della foto in photos
        photos.push(photo.thumbnailUrl);
      }
    });
    console.log(photos$);
    console.log(photos[0]);
    // costruiamo i div programmaticamente
    // viene inserito come background il thumbnail della prima foto
    tagCol += `<div class="col-3" style="background-image:url(${photos[0]});">
    <div class="albums"  onclick="getPhotos(${album.id})">
    </div>
    </div>`;
    // inseriamo i div di tutti gli album all'interno del div degli album
    document.getElementById("contentAlbum").innerHTML = tagCol;
  });
}

async function getUsers() {
  let users$ = await fetch(serverURL + usersURL).then((response) =>
    response.json()
  );
  return users$;
}

function init() {
  let users = getUsers();
  let optionTag = "";
  users.then((user) => {
    user.forEach((element) => {
      optionTag += `<option value="${element.id}">${element.name}</option>`;
    });
    document.getElementById("users").innerHTML = optionTag;
  });
}

window.onload = () => {
  init();
};
