/** @jsx React.DOM */

var React = require('react');
var shuffle = require('knuth-shuffle').knuthShuffle

var AnswersList = require('./AnswersList');
var Screen = require('./Screen');

var RiddlesScreen = React.createClass({
  getDefaultProps: function() {
    return {
      riddles: {},
      levels: [],
      onNoLivesLeft: function() {}
    }
  },

  getInitialState: function() {
    return {
      currentLevel: 0,
      currentRiddleIndex: 0,
      showRiddle: "r1",
      completedRiddles: {},
      livesLeft: 3,
      hintsLeft: 4,
    }
  },

  getCurrentLevel: function() {
    var level = this.props.levels[this.state.currentLevel];
    return level;
  },

  getCurrentRiddle: function() {
    var level = this.getCurrentLevel();
    if (!level) {
      return null;
    }
    currentRiddle = this.props.riddles[level.riddles[this.state.currentRiddleIndex]]
    return currentRiddle;
  },

  handleCorrectAnswer: function(riddle) {
    var completedRiddles = this.state.completedRiddles;
    completedRiddles[riddle.id] = riddle;
    this.setState({completedRiddles:completedRiddles});
    if (this.state.currentRiddleIndex < this.getCurrentLevel().riddles.length - 1) {
      this.setState({currentRiddleIndex:this.state.currentRiddleIndex+1});
    } else {
      this.setState({
        currentLevel: this.state.currentLevel + 1,
        currentRiddleIndex: 0
      });
    }
  },

  handleWrongAnswer: function(riddle) {
    if (this.state.livesLeft <= 0) {
      this.props.onNoLivesLeft();
    }
    this.setState({livesLeft:this.state.livesLeft - 1});
  },

  render: function() {
    var riddle = this.getCurrentRiddle();
    if (!riddle) {
      return <Screen></Screen>;
    }
    var lines = riddle.riddle.map(function(line, index) {
      return <div key={"riddle-line-"+index} className="riddleLine" dangerouslySetInnerHTML={{__html:line}}></div>;
    });
    var answers = [];
    this.getCurrentLevel().riddles.forEach(function(riddleKey) {
      if (!this.state.completedRiddles[riddleKey]) {
        answers.push(this.props.riddles[riddleKey].answer);
      }
    }.bind(this));
    answers = shuffle(answers);
    return (
      <Screen>
        <div className="riddlesView">
          <div className="riddleStats clearfix">
            <div className="level">
              Level: <strong>{this.state.currentLevel + 1}</strong>
            </div>
            <div className="riddles">
              Riddles: <strong>{answers.length}</strong>
            </div>
            <div className="lives">
              Lives: <strong>{this.state.livesLeft}</strong>
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