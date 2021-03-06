import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { hoverColor } from "../commonStyles";
import { formatTimeStamp, getQuestionID } from "../utils";
import api from "../api";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

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
    background-color: ${hoverColor};
  }
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1em;
`;

const SingleQuestion = ({ question }) => {
  const questionID = getQuestionID(question);
  return (
    <StyledLink
      to={{ pathname: `/question/${questionID}`, state: { question } }}
    >
      <QuestionCard>
        <b>{question.question}</b>
        <QuestionExtras>
          <p>{formatTimeStamp(question.published_at)}</p>
          <p>{question.choices.length} choices</p>
        </QuestionExtras>
      </QuestionCard>
    </StyledLink>
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
    const response = await api.getQuestions();
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
