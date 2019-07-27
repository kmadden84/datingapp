import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Ball } from './UserSignIn';
//import ReactMarkdown from 'react-markdown/with-html'

class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageContent: "",
      redirect: false,
      loader: true,
    }
  }
  componentDidMount(props) { // Loading course details on mount
    console.log('hi')
    return new Promise((resolve, reject) => {
      var user = this.props.user;
      var pass = this.props.password;
      var target = this.props.match.params;
      target = target.id;
      this.setState({
        currentCourse: target
      });
      fetch('https://datingapi.herokuapp.com/api/creds/messages/' + target + '', {
      //fetch('http://localhost:5000/api/creds/messages/' + target + '', {
        method: "GET",
        mode: "cors",
        headers: {
          'Authorization': 'Basic ' + btoa(user + ':' + pass),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.setState({
            loader: false
          });
          if (response.status === 400) {
            this.setState({
              redirect: true
            })
          }
          else if (response.status === 200) {
            response.json().then((responseJson) => {
              console.log(responseJson)
              resolve(responseJson)
              if (responseJson) { //IF there's a user, set course content and creator
                this.setState({
                  message: responseJson.msg.message,
                  subject: responseJson.msg.subject,
                  sender: responseJson.msg.Credential.first_name + ' ' + responseJson.msg.Credential.last_name
                })
              }
            })
          }
        })
        .catch((error) => {
          reject(error);
          this.props.history.push("/error");
        })
    })
  }
  render(props) {

    if (this.state.redirect) {
      this.props.history.push("/notfound");
    }

    return (

      <div className="msgBlock">
      <p>From: {this.state.sender}</p>
      <p>Subject: {this.state.subject}</p>
       <p>Message: {this.state.message}</p>
        </div>
    );

  }
}

export default UserDetails;
