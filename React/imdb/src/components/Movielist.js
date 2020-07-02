import React from 'react';
import MovieItem from "./MovieItem.js";

function Movielist(props) {
  if (!props.movies) {
    return null;
  } 
  
  return (
    <div className="row">
      {
        props.movies.map ((movie) => {
        return <MovieItem key={movie.imdbID} movie = {movie} />;
        })
      }
    </div>
  )
}

export default Movielist;