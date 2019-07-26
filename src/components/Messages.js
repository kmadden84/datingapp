import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Ball} from './UserSignIn';

class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgContent: "",
      message: "",
      date_received: "",
      sender: ""
    }
  }
  componentDidMount(props) {
    return new Promise((resolve, reject) => {
      var user = this.props.user;
      var pass = this.props.password;
      //fetch('http://localhost:5000/api/creds/messages', {
      fetch('https://datingapi.herokuapp.com/api/creds/messages', {
        method: "GET",
        mode: "cors",
        headers: {
          'Authorization': 'Basic ' + btoa(user + ':' + pass),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              successful: true
            });
          }
          response.json().then((responseJson) => {
            resolve(responseJson)
            if (responseJson.count[0] != null) {
              this.setState({
                msgContent: responseJson.count,
              });
            } else {
            }
          })
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
  render(props) {

    // var msgContent = []
    var imgTile = []
     //var i;

    console.log(this.state.msgContent)

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [month, day, year].join('/');
  }
    

    for (var i=0; i < this.state.msgContent.length; i++) {
      var from = this.state.msgContent[i].Credential.first_name + ' ' + this.state.msgContent[i].Credential.last_name;
      var subject = this.state.msgContent[i].subject;
      var date = this.state.msgContent[i].createdAt;
          date = formatDate(date); 
      var id = this.state.msgContent[i].id;

     // var sender = this.state.msgContent.Credential[0].first_name + this.state.msgContent.Credential[0].first_name;
      imgTile.push(
        <NavLink to={`/messages/${id}/`}>
        <div className="messageTile" key={i}>
            <h4 className="msg--label">Date: {date}</h4>
            <h4 className="msg--label">From: {from}</h4>
            <h4 className="msg--label">{subject}</h4>
        </div>
        </NavLink>
      )      
    }


    return (
     <div className="profileBlock">
                {
        (this.state.loader)
        ? <Ball /> //Loader
        : ""
      } 

    <h1>Your Messages</h1>

{imgTile}

     <NavLink to='/update-profile'>Wanna Change Something? Update Profile</NavLink>

      </div>
    );
  }
}

export default MyProfile;