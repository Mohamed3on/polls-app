import moment from "moment";
import React from "react";

import { Route } from "react-router-dom";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

export const formatTimeStamp = timestamp =>
  moment(timestamp).format("DD/MM/YYYY");

export const getPercentage = (number, total) =>
  (number / total).toLocaleString("en", { style: "percent" });

export const getQuestionID = question => question.url.split("/").pop();

export const sumVotes = question =>
  question.choices.reduce(
    (accumulator, currentChoice) => accumulator + currentChoice.votes,
    0
  );
