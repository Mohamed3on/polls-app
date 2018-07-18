import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "normalize.css";

import QuestionList from "./components/QuestionsList";
import QuestionDetails from "./components/QuestionDetails";

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
body {
  font-family: Lato,sans-serif;
    font-size: 16px;
    color: #343434;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  height: 80px;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header>
            <Link to="/">
              <p>Questions List</p>
            </Link>
          </Header>
          <Switch>
            <Route exact path="/" component={QuestionList} />
            <Route path="/question/:id" component={QuestionDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
