import React from "react";

function MovieItem (props) {
  return (
    <div className="card col-3">
      <img className="card-img-top" src={props.poster} alt="movie-poster"/>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
      </div>
    </div>
  );
}

export default MovieItem;