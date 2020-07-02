import React from "react";

function MovieItem ({movie}) {
  return (
    <div className="card col-3">
      <img className="card-img-top" src={movie.Poster} alt="movie-poster"/>
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
      </div>
    </div>
  );
}

export default MovieItem;