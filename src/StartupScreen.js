/** @jsx React.DOM */

var React = require('react');

var Screen = require('./Screen');

var StartupScreen = React.createClass({
  render: function() {
    return (
      <Screen>
        <div className="startupScreen">
          Starting up...
          <div className="progress">
            <div className="progress-bar progress-bar-striped active" style={{width: this.props.percentComplete+"%"}}>
              <span className="sr-only">Starting up...</span>
            </div>
          </div>
        </div>
      </Screen>
    );
  }
});

module.exports = StartupScreen;