import React from 'react';
import MovieItem from "./MovieItem.js";

function Movielist(props) {
  return (
    <div className="row">
      {
        props.movies.map ((movie) => {
        return <MovieItem key={movie.imdbID} poster={movie.Poster} title={movie.Title} />;
        })
      }
    </div>
  )
}

export default Movielist;