import React from 'react'
import Container from "./Container";
import Form from "./Form";

export default function About() {
  return (
    <>
    <h1>Siamo noi!</h1>
    <Container body={<><Form /></>}></Container>
    </>
  )
}
