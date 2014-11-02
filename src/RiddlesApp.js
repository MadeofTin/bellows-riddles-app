/** @jsx React.DOM */

$ = require('jquery');
var Parse = require('parse').Parse;
var React = require('react');

var Screen = require('./Screen');
var StartupScreen = require('./StartupScreen');
var CreateAccountScreen = require('./CreateAccountScreen');
var RiddlesScreen = require('./RiddlesScreen');

var RiddlesApp = React.createClass({
  getInitialState: function() {
    return {
      startupPercent: 0,
      riddles: {},
      gameOver: false,
      user: null
    }
  },

  simulateStartup: function() {
    var newPercent = this.state.startupPercent + 100;
    newPercent = Math.min(newPercent, 100);
    this.setState({startupPercent: newPercent});
    if (newPercent < 100) {
      window.setTimeout(this.simulateStartup, 30)
    }
  },

  handleNoLivesLeft: function() {
    this.setState({gameOver: true});
  },

  componentDidMount: function() {
    RiddlesApp.instance = this;
    // simulate fetching of data and other app initialization
    this.simulateStartup();

    this.setState({user: Parse.User.current()});

    $.ajax({
      url: '/json-db/json/riddles/riddles.json',
      dataType: 'json',
      success: function(data) {
        this.setState({riddles: data, startupPercent:100});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("failed loading riddles", status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    if (!this.state.user) {
      return <CreateAccountScreen />
    } else if (this.state.startupPercent < 100) {
      return <StartupScreen percentComplete={this.state.startupPercent}/>;
    } else if (this.state.gameOver) {
      return <Screen><h1>Game Over</h1></Screen>;
    } else {
      return <RiddlesScreen riddles={this.state.riddles} onNoLivesLeft={this.handleNoLivesLeft}/>;
    }
  }
});

module.exports = RiddlesApp;