import React from "react"
import SearchBar from "./SearchBar"

export default function Navbar({onsearch}) {
  return (
  <>
    <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <SearchBar onsearch={onsearch}/>
    </div>
  </>)
}