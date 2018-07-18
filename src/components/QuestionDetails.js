import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import api from "../api";

import { getPercentage, getQuestionID } from "../utils";
import { hoverColor } from "../commonStyles";

const Wrapper = styled.div`
  margin: auto auto 50px;
  width: 80%;
`;
const ChoicesList = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
`;
const StyledChoice = styled.div`
  padding: 0 1em;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    ${({ hoverEnabled }) =>
      hoverEnabled && ` background-color: ${hoverColor};`};
  }
  ${({ chosen }) =>
    chosen &&
    `
  background-color:${hoverColor}`};
`;

const Choice = ({
  choice,
  percentage,
  chosen,
  index,
  onClick,
  hoverEnabled
}) => (
  <StyledChoice
    hoverEnabled={hoverEnabled}
    onClick={() => onClick(index)}
    chosen={chosen}
  >
    <p>{choice.choice}</p>
    <p>{choice.votes}</p>
    <p>{percentage}</p>
  </StyledChoice>
);
const Choices = ({ question }) => {
  const totalVotes = question.choices.reduce(
    (accumulator, currentChoice) => accumulator + currentChoice.votes,
    0
  );
  return (
    <ChoicesList>
      {question.choices.map((choice, index) => (
        <Choice
          chosen={this.state.choiceIndex === index}
          choice={choice}
          key={choice.choice}
          index={index}
          percentage={getPercentage(choice.votes, totalVotes)}
          onClick={this.choiceOnClick}
          hoverEnabled={!this.state.answered}
        />
      ))}
    </ChoicesList>
  );
};
export default class QuestionDetails extends Component {
  state = {
    question: null,
    answered: false,
    choiceIndex: null
  };

  componentDidMount = async () => {
    this.setState({ question: await this.getQuestion() });
  };

  choiceOnClick = index => {
    !this.state.answered && this.setState({ choiceIndex: index });
  };
  submitVote = async () => {
    const toastProps = {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true
    };
    if (this.state.choiceIndex) {
      await api.submitVote(
        getQuestionID(this.state.question),
        this.state.choiceIndex + 1
      );

      this.setState({ answered: true });
      toast.success("🦄 Your vote was submitted successfully!", {
        ...toastProps
      });
      return;
    }
    toast.warn("Please select a choice first!", {
      ...toastProps
    });
  };

  getQuestion = async () => {
    if (this.props.location.state) return this.props.location.state.question;
    try {
      const response = await api.getQuestion(this.props.match.params.id);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  render() {
    const question = this.state.question;
    if (!question) return null;

    return (
      <Wrapper>
        <h1>Question Details</h1>
        <h2>{question.question}</h2>
        <Choices question={question} />
        <Button
          onClick={this.submitVote}
          variant="outlined"
          color="primary"
          style={{ float: "right", marginTop: "1em" }}
        >
          Vote
        </Button>
        <ToastContainer />
      </Wrapper>
    );
  }
}
