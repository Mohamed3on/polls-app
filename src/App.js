import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PropsRoute } from "./utils";
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

class App extends Component {
  state = {
    votedQuestions: new Map()
  };
  addVote = (questionID, choiceID) => {
    this.state.votedQuestions.set(questionID, choiceID);
  };
  getChoice = questionID => {
    this.state.votedQuestions.get(questionID);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={QuestionList} />
          <PropsRoute
            addVote={this.addVote}
            getChoice={this.getChoice}
            path="/question/:id"
            component={QuestionDetails}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
