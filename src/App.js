import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import QuestionList from "./components/QuestionsList";
import "normalize.css";

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
body {
  font-family: Lato,sans-serif;
    font-size: 16px;
    color: #343434;
  }
`;

class App extends Component {
  render() {
    return <QuestionList />;
  }
}

export default App;
