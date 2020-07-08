import React from 'react'
import "../css/Container.css";

export default function Container({body}) {
  return (
    <div className="container-box">
      {body}
    </div>
  )
}
