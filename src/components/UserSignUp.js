import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import axios from 'axios';

import {Ball} from './UserSignIn';
const DefaultImg = process.env.PUBLIC_URL + "/images/default-image.jpg"

class UserSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multerImage: DefaultImg,
      imageFormObj: "",
      wouldNever: "",
      seeking: "",
      loader: false
    }
    this.createUser = this.createUser.bind(this);
  }
  createUser(e, props) {
    this.setState({
      loader: true,
    });
    e.preventDefault();
    //validating that all fields are entered
    if (!this.username.value || !this.pass.value || !this.firstname.value || !this.lastname.value) {
      alert('Required Fields Missing')
      this.setState({
        loader: false,
      });
    }
    else {
      return new Promise((resolve, reject) =>
        fetch('https://datingapi.herokuapp.com/api/creds', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "first_name": this.firstname.value,
            "last_name": this.lastname.value,
            "username": this.username.value,
            //validating that password matches confirm pass before it's passed to post request
            "password": (this.pass.value !== this.passConfirm.value) ? alert('passwords dont match') : this.pass.value
          })
        })
          .then((response) => {
            this.setState({
              loader: false
            });
            if (response.status === 200) {
              this.props.userdata(this.username.value, this.pass.value);
              this.props.history.push("/create-account");
            }
            else {
              response.json().then((responseJson) => {
                resolve(responseJson)
                alert(responseJson.Error);
              })
            }
          })
          .catch((error) => {
            reject(error);
            this.props.history.push("/error")
          })
      )
    }
}
render(props) {
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        {/* {
        (this.state.loader)
        ? <Ball />
        : ""
        } */}
        <h1>Sign Up</h1>
        <div>
          <form>
            <div className="loginInfo">
            <div className="row">
                <div>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    ref={(input) => this.firstname = input} />
                </div>
                <div>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    ref={(input) => this.lastname = input} />
                </div>
              </div>
              <div className="row">
                <div>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    placeholder="Email Address"
                    ref={(input) => this.username = input} />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    ref={(input) => this.pass = input} />
                </div>
              </div>
             
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  ref={(input) => this.passConfirm = input} />
              </div>
            </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.createUser}>Sign Up</button>
                <NavLink className="button button-secondary" to="/">Cancel</NavLink></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <NavLink to="/signin">Click here</NavLink> to sign in!</p>
      </div>
      </div>
  );
}
}
export default UserSignUp;