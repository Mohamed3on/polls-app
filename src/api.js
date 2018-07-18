import axios from "axios";

const getQuestion = questionID =>
  axios.get(`https://polls.apiblueprint.org/questions/${questionID}`);
const submitVote = (questionID, choiceID) =>
  axios.post(
    `https://polls.apiblueprint.org/questions/${questionID}/choices/${choiceID}`
  );
const getQuestions = () =>
  axios.get("https://polls.apiblueprint.org/questions");

export default {
  submitVote,
  getQuestion,
  getQuestions
};
