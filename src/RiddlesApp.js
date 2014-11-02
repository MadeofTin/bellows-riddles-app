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
      riddles: {},
      levels: [],
      gameOver: false,
      user: null
    }
  },

  handleNoLivesLeft: function() {
    this.setState({gameOver: true});
  },

  componentDidMount: function() {
    RiddlesApp.instance = this;

    this.setState({user: Parse.User.current()});

    $.ajax({
      url: '/json-db/json/modes/mode-levels/basic-levels.json',
      dataType: 'json',
      success: function(data) {
        this.setState({levels:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("failed loading levels", status, err.toString());
      }.bind(this)
    });

    $.ajax({
      url: '/json-db/json/riddles/riddles.json',
      dataType: 'json',
      success: function(data) {
        this.setState({riddles: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("failed loading riddles", status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    if (this.state.gameOver) {
      return <Screen><h1>Game Over</h1></Screen>;
    } else {
      return <RiddlesScreen riddles={this.state.riddles} levels={this.state.levels} onNoLivesLeft={this.handleNoLivesLeft}/>;
    }
  }
});

module.exports = RiddlesApp;