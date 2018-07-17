import React, { Component } from "react";
import "react-notifications/lib/notifications.css";
import styled from "styled-components";
import { getPercentage } from "../utils";

const Wrapper = styled.div`
  margin: auto auto 50px;
  width: 80%;
`;
const ChoicesList = styled.div`
  border: 1px solid;
  border-radius: 5px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
`;
const StyledChoice = styled.div`
  padding: 0 1em;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: hsla(200, 79%, 85%, 0.53);
  }
`;
const Choice = ({ choice, percentage }) => (
  <StyledChoice>
    <p>{choice.choice}</p>
    <p>{choice.votes}</p>
    <p>{percentage}</p>
  </StyledChoice>
);
export default class QuestionDetails extends Component {
  render() {
    const question = this.props.location.state.question;
    const totalVotes = question.choices.reduce(
      (accumulator, currentChoice) => accumulator + currentChoice.votes,
      0
    );
    return (
      <Wrapper>
        <h1>Question Details</h1>
        <h2>{question.question}</h2>
        <ChoicesList>
          {question.choices.map(choice => (
            <Choice
              choice={choice}
              key={choice.choice}
              percentage={getPercentage(choice.votes, totalVotes)}
            />
          ))}
        </ChoicesList>
      </Wrapper>
    );
  }
}
