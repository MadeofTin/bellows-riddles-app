/** @jsx React.DOM */

var React = require('react');

var NavBar = require('./NavBar');

var Screen = React.createClass({
  render: function() {
    return (
      <div className="screen">
        
        {this.props.children}
      </div>
      );
  }
});

module.exports = Screen;