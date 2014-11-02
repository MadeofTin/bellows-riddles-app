/** @jsx React.DOM */

var Parse = require('parse').Parse;
Parse.initialize("TcZ80EiPLEGfv5mV3I6boYmPwb0PL0iTL0P0QR32", "jnh4IUAeF8r23K0nKvcX0bNbKyoptQ8ZcGYzjqsK");
var React = require('react');

require('./styles.css')

var RiddlesApp = require('./RiddlesApp');

React.renderComponent(
  <RiddlesApp/>,
  document.getElementById('main')
);