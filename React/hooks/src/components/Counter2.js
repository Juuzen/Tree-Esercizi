import React, { useState, useEffect } from 'react'

const serverURL = "https://jsonplaceholder.typicode.com/";
const photosURL = "photos/";
const albumsURL = "albums/";
const usersURL = "users/";

export default function Counter2() {
  
  //const [counter, setCounter] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(0);


useEffect(() => {
  const getUsers = async () => {
    const fetchedUsers = await fetch(serverURL + usersURL).then(res => res.json());
    setUsers(fetchedUsers);
  }

  getUsers();
}, [])

  useEffect(() => {
      const getAlbums = async () => {
      const fetchedAlbums = await fetch(serverURL + albumsURL).then(res => res.json());
      setAlbums(fetchedAlbums);
    }

    getAlbums();
  }, [selectedUser])

  // it triggers like componentDidMount AND componentDidUpdate
  useEffect(() => {
    const getPhotos = async () => {
      const fetchedPhotos = await fetch(serverURL + photosURL).then(res => res.json());
      setPhotos(fetchedPhotos.slice(0, 10));
    }

    getPhotos();
  }, [selectedAlbum])
  //is the [input] parameter in useEffect is null, it nullifies the
  // update rendering, and it triggers only on mounting

  changeAlbum = ({target}) => {
    setSelectedAlbum(target.value)
  }

  changeUser = ({target}) => {
    setSelectedUser(target.value)
  }

  return (
    <>
      <h1>Gestore albums</h1>
      <select onChange={changeUser}>
        <option disabled selected>Seleziona un utente:</option>
        {
          users.map((user) => {
          return <option value={user.id} key={user.id}>{user.name}</option>
          })
        }
      </select>
      <select onChange={changeAlbum}>
        <option disabled selected>Seleziona un album:</option>
        {
          albums.map((album) => {
          return (<option value={album.id}>{album.title}</option>)
          })
        }
      </select>
      <h1>Immagini</h1>
      <ul>
        {
          photos.map((img, i) => {
            return <li key={i}><img style={{ width: '100px', margin: '20px' }} src={img.url}/></li>
          })
        }
      </ul>
    </>)


/*
  return (
    <>
      <h1>Sono un bottone contatore!</h1>
      <h2>{counter}</h2>
      <button onClick={() => {setCounter(counter + 1)}}>Incrementa</button>
    </>
  ) */
}
