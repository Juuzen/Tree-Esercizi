import React, { Component } from 'react'
import Movielist from "./components/Movielist.js";
import "bootstrap/dist/css/bootstrap.css";

const APIKEY = "669e5564";
const APIURL = "http://www.omdbapi.com/?apikey=";

function fetchMovies(searchString = "game") {
  return fetch(APIURL + APIKEY + "&s=" + searchString).then(res => res.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : [],
      totalMovies : 0
    };
  }

  componentDidMount() {
    fetchMovies().then((list) => {
      this.setState({
        movies : list.Search,
        totalMovies : list.totalResults
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2 text-center">
            <h1>I miei film preferiti</h1>
            <Movielist movies={this.state.movies}></Movielist>
          </div>
        </div>

      </div>
    )
  }
}

export default App;