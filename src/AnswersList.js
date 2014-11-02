/** @jsx React.DOM */

var React = require('react');

var AnswersList = React.createClass({
  getDefaultProps: function() {
    return {
      onCorrectAnswer: function() {},
      onWrongAnswer: function() {},
      answer: "",
      correctAnswer: ""
    }
  },
  handleAnswerClick: function(answer, event) {
    if (answer == this.props.correctAnswer) {
      this.props.onCorrectAnswer(answer);
    } else {
      this.props.onWrongAnswer(answer);
    }
  },
  render: function() {
    var answers = this.props.answers.map(function(answer, index) {
      return (
        <button
          className="riddleAnswer btn"
          onClick={this.handleAnswerClick.bind(this, answer)}
          key={"answer-list"+index}>
          {answer}
        </button>
      );
    }.bind(this));
    return (
      <div className="answersPane">
        <div className="answersList">
          {answers}
        </div>
      </div>
    );
  }
});

module.exports = AnswersList;