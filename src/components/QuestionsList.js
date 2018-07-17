import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import { formatTimeStamp } from "../utils";

const Wrapper = styled.div`
  margin: 50px;
`;
const QuestionsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const QuestionExtras = styled.div`
  font-weight: 300;
`;
const QuestionCard = styled.div`
  &:hover {
    background-color: hsla(200, 79%, 85%, 0.53);
  }
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1em 1em 0 1em;
`;

const SingleQuestion = ({ question }) => {
  return (
    <QuestionCard>
      <b>{question.question}</b>
      <QuestionExtras>
        <p>{formatTimeStamp(question.published_at)}</p>
        <p>{question.choices.length} choices</p>
      </QuestionExtras>
    </QuestionCard>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.object.isRequired
};

export default class QuestionsList extends Component {
  state = {
    questions: []
  };
  componentDidMount = async () => {
    const response = await axios.get(
      "https://polls.apiblueprint.org/questions"
    );
    const questions = response.data;
    this.setState({ questions });
  };

  render() {
    return (
      <Wrapper>
        <h1>Questions</h1>
        <QuestionsGrid>
          {this.state.questions.map(question => (
            <SingleQuestion question={question} key={question.url} />
          ))}
        </QuestionsGrid>
      </Wrapper>
    );
  }
}
