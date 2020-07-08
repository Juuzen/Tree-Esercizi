import React, { useState, useEffect } from "react";
import "../css/Gallery.css";

const serverURL = "https://jsonplaceholder.typicode.com/";
const photosURL = "photos?albumId=";
const albumsURL = "albums?userId=";
const usersURL = "users/";

export default function Gallery() {

  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(0);

  // dichiarare queste funzioni fuori dall'useEffect causa un warning
  // di missing dependency, meglio farle dentro l'useEffect se non vengono
  // richiamate da qualche altra parte

  // Ricordati che le useEffect sono funzioni asincrone, quindi non si può
  // usare async/await al suo interno, altrimenti c'è un warning di race condition
  const getPhotos = async () => {
    const fetchedPhotos = await fetch(serverURL + photosURL + selectedAlbum).then(res => res.json());
    setPhotos(fetchedPhotos);
  }

  const getAlbums = async () => {
    const fetchedAlbums = await fetch(serverURL + albumsURL + selectedUser).then(res => res.json());
    setAlbums(fetchedAlbums);
  }

  const getUsers = async () => {
    const fetchedUsers = await fetch(serverURL + usersURL).then(res => res.json());
    setUsers(fetchedUsers);
  }

  const changeAlbum = ({target}) => {
    setSelectedAlbum(target.value);
  }

  const changeUser = ({target}) => {
    setSelectedUser(target.value);
  }

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    if (selectedUser) {
      getAlbums();
    }
  }, [selectedUser])

  useEffect(() => {
    if (selectedAlbum) {
      getPhotos();
    }
  }, [selectedAlbum])

  

  return (
    <>
      <h1>Gallery</h1>
      <select onChange={changeUser}>
      <option defaultValue="0" disabled>Seleziona un utente:</option>
      {
        users.map((user, i) => {
          return <option className="user" key={i} value={user.id}>{user.name}</option>
        })
      }
      </select>
      <select onChange={changeAlbum}>
        <option defaultValue="0" disabled>Seleziona un album:</option>
        {
          albums.map((album, i) => {
            return <option className="album" key={i} value={album.id}>{album.title}</option>
          })
        }
      </select>
        <ul className="photo-list">
        {
          photos.map((img, i) => {
            return <li className="list" key={i}><img className="photo" src={img.url} alt="album"/></li>
          })
        }
      </ul>
    </>
  );
}