/** @jsx React.DOM */

var Parse = require('parse').Parse;
var React = require('react');

var Screen = require('./Screen');

var CreateAccountScreen = React.createClass({
  getInitialState: function() {
    return {
      showLoginScreen: false,
      isCreatingAccount: false,
      isLoggingIn: false
    };
  },

  handleCreateAccountClick: function() {
    var username = this.refs.usernameField.getDOMNode().value;
    var password = this.refs.passwordField.getDOMNode().value;
    if (password != this.refs.passwordConfirmField.getDOMNode().value) {
      alert("Passwords do not match.");
    } else {
      this.setState({isCreatingAccount:true});
      var user = new Parse.User();
      user.set('username', username);
      user.set('password', password);
      user.signUp(null, {
        success: function(user) {
          RiddlesApp.instance.setState({user:user});
        },
        error: function(user, error) {
          alert("Something went wrong: "+error.code+' '+error.message);
        }
      })
    }
  },

  handleShowLoginClick: function(shouldShowLoginScreen) {
    this.setState({showLoginScreen:shouldShowLoginScreen});
  },

  handleLoginClick: function() {
    this.setState({isLoggingIn:true});
    Parse.User.logIn(
      this.refs.usernameField.getDOMNode().value,
      this.refs.passwordField.getDOMNode().value,
      {
        success: function(user) {
          RiddlesApp.instance.setState({user:user});
        },
        error: function(user, error) {
          alert("Something went wrong: "+error.code+' '+error.message);
        }
      });
  },

  render: function() {

    var content = null;
    if (this.state.isCreatingAccount) {
      // we are in the middle of creating an account, so say so.
      content = <h3>Creating Account...</h3>;
    } else if (this.state.showLoginScreen) {
      // user clicked the login button, so show them that.
      content = (
        <div>
          <h3>Log In</h3>
          <div className="form-group">
            <label>Username</label>
            <input ref="usernameField" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="passwordField" type="password" className="form-control"/>
          </div>
          <button className="pull-left btn btn-default" onClick={this.handleShowLoginClick.bind(this, false)}>Sign Up</button>
          <button className="pull-right btn btn-primary" onClick={this.handleLoginClick}>Login</button>
        </div>
        );
    } else {
      // Ask the user to create an account
      content = (
        <div>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>Username</label>
            <input ref="usernameField" type="text" className="form-control" placeholder="Something fun..." />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="passwordField" type="password" className="form-control" placeholder="Something good..." />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input ref="passwordConfirmField" type="password" className="form-control" placeholder="One more time..." />
          </div>
          <button className="pull-left btn btn-default" onClick={this.handleShowLoginClick.bind(this, true)}>Login</button>
          <button className="pull-right btn btn-primary" onClick={this.handleCreateAccountClick}>Create Account</button>
        </div>
        );
    }

    return <div className="introScreen">
      <h1>{"Bellow's Riddle Adventure"}</h1>
      {content}
    </div>
  }
});

module.exports = CreateAccountScreen;