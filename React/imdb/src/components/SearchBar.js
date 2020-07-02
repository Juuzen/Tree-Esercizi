import React from "react"

// esempio di componente controllato

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue : "La casa di carta"
    };
  }

  saveSearch = (event) => {
    this.setState({
      searchValue : event.target.value
    })
  }

  searchClick = (event) => {
    event.preventDefault();
    this.props.onsearch(this.state.searchValue);
  }

  render() {
    return (
      <>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.saveSearch} value={this.state.searchValue} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchClick}>Search</button>
        </form>
      </>
    )
  }
}