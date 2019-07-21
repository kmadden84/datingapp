import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

//import {Ball} from './UserSignIn';
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
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: DefaultImg
      })
    }
  }
  uploadImage(e, method) {
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now())
    imageFormObj.append("imageData", e.target.files[0])

    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0]),
      imageFormObj: imageFormObj
    })
  }

  createUser(e, props) {
    this.setState({
      loader: true,
    });

    e.preventDefault();
    //validating that all fields are entered
    if (!this.username.value || !this.pass.value) {
      alert('Required Fields Missing')
      this.setState({
        loader: false,
      });
    }
    else {
      return new Promise((resolve, reject) =>
        fetch('https://datingapi.herokuapp.com/api/user', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
               this.props.history.push("/userdetails");
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
            <div className="profileInfo">
              <div className="row">
                <input
                  type="file"
                  className="process_upload-btn"
                  onChange={(e) => this.uploadImage(e, "multer")}
                  name="age"
                  ref={(input) => this.img = input}
                />
                <img src={this.state.multerImage} alt="upload-image" className="process__image" />

              </div>

              <div className="row">
                <div>
                  <input
                    type="text"
                    name="age"
                    ref={(input) => this.age = input}
                    placeholder="Age" />
                </div>
                <div>
                  <input
                    type="text"
                    name="weight"
                    ref={(input) => this.weight = input}
                    placeholder="Weight" />
                </div>
              </div>
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="height"
                    ref={(input) => this.height = input}
                    placeholder="Height" />
                </div>
                <div>
                  <input
                    type="text"
                    name="movie"
                    ref={(input) => this.fav_movie = input}
                    placeholder="Favorite Movie" />
                </div>
              </div>
              <div className="row">
                <div>
                  <input type="text"
                    name="tvshow"
                    ref={(input) => this.fav_tvshow = input}
                    placeholder="Favorite TV Show" />
                </div>
                <div>
                  <input type="search"
                    name="vaca"
                    ref={(input) => this.fav_vaca = input}
                    placeholder="Favorite Vacation" />
                </div>
              </div>
              <div className="row">
                <div>
                  <input type="search"
                    name="band"
                    ref={(input) => this.fav_band = input}
                    placeholder="Favorite Band" />
                </div>
                <div>
                  <input type="search"
                    name="song"
                    ref={(input) => this.fav_song = input}
                    placeholder="Favorite Song" />
                </div>
              </div>
              <div>
                <select name="seeking" className="seeking" onChange={this.handleChange}>
                  <option value="" selected disabled hidden>Select a Gender</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="both">Either I'm not picky</option>

                </select>
              </div>

              <div>
                <select name="wouldNever" className="wouldNever" onChange={this.handleChange}>
                  <option value="" selected disabled hidden>Select something you'd never do...</option>
                  <option value="skydive">Skydive</option>
                  <option value="bugs">Eat Bugs</option>
                  <option value="phone">Go without my phone for a month</option>
                  <option value="car">Go without my car for a month</option>
                  <option value="car">Go without my headphones for a month</option>
                </select>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.createUser}>Sign Up</button>
                <NavLink className="button button-secondary" to="/">Cancel</NavLink></div>
            </div>
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