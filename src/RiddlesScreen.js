/** @jsx React.DOM */

var React = require('react');
var shuffle = require('knuth-shuffle').knuthShuffle

var AnswersList = require('./AnswersList');
var Screen = require('./Screen');

var RiddlesScreen = React.createClass({
  getDefaultProps: function() {
    return {
      riddles: {},
      onNoLivesLeft: function() {}
    }
  },

  getInitialState: function() {
    return {
      showRiddle: "r1",
      completedRiddles: {},
      livesLeft: 3,
      hintsLeft: 4,
    }
  },

  handleCorrectAnswer: function(riddle) {
    var completedRiddles = this.state.completedRiddles;
    completedRiddles[riddle.id] = riddle;
    this.setState({completedRiddles:completedRiddles});
    for (var key in this.props.riddles) {
      if (this.state.completedRiddles[key]) {
        continue;
      }
      this.setState({showRiddle: key});
      break;
    }
  },

  handleWrongAnswer: function(riddle) {
    if (this.state.livesLeft <= 0) {
      this.props.onNoLivesLeft();
    }
    this.setState({livesLeft:this.state.livesLeft - 1});
  },

  render: function() {
    var riddle = this.props.riddles[this.state.showRiddle];
    if (!riddle) {
      return <Screen></Screen>;
    }
    var lines = riddle.riddle.map(function(line, index) {
      return <div key={"riddle-line-"+index} className="riddleLine" dangerouslySetInnerHTML={{__html:line}}></div>;
    });
    var answers = [];
    $.each(this.props.riddles, function(key, riddle) {
      if (!this.state.completedRiddles[key]) {
        answers.push(riddle.answer);
      }
    }.bind(this));
    answers = shuffle(answers);
    return (
      <Screen>
        <div className="riddlesView">
          <div className="riddleStats clearfix">
            <div className="riddleStat">
              Riddles: <strong>{answers.length}</strong>
            </div>
            <div className="riddleStat">
              Lives: <strong>{this.state.livesLeft}</strong>
            </div>
            <div className="riddleStat">
              Hints: <strong>{this.state.hintsLeft}</strong>
            </div>
          </div>
          <AnswersList
            answers={answers}
            correctAnswer={riddle.answer}
            onCorrectAnswer={this.handleCorrectAnswer.bind(this, riddle)}
            onWrongAnswer={this.handleWrongAnswer.bind(this, riddle)}/>
          <div className="riddleLines">
            {lines}
          </div>
        </div>
      </Screen>
    );

  }
});

module.exports = RiddlesScreen;