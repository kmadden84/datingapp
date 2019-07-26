import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Ball} from './UserSignIn';

class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prof_img: "",
      courseContent: "",
      creator: "",
      fav_movie: "",
      fav_band: "",
      fav_song: "",
      looking_for: "",
      drinking: "",
      education: "",
      build: "",
      living_status: "",
      age: "",
      ideal_vaca: "",
      fav_cheese: "",
      fav_timeofday: "",
      fav_mov_genre: "",
      fav_weather: "",
      fav_drink: "",
      fav_cuisine: "",
      first_name: "",
      last_name: "",
      loader: true
    }
  }
  componentDidMount(props) {
    return new Promise((resolve, reject) => {

      var user = this.props.user;
      var pass = this.props.password;
      //fetch('http://localhost:5000/api/users/', {
      fetch('https://datingapi.herokuapp.com/api/users/', {
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
            console.log(responseJson)
            resolve(responseJson)
            if (responseJson.user[0] != null) {
              this.setState({
                courseContent: responseJson.user,
                creator: responseJson.user[0].Credential.username,
                loader: false
              });
            } else {
              this.props.history.push("/create-account")
            }
            //console.log(responseJson.user[0].first_name)
            // if (this.props.user !== this.state.creator) {
            //   // alert('Only the content creator may update this course')
            //   this.props.history.push("/forbidden");
            //  }
            //setting states to manage course fields
            Object.entries(this.state.courseContent).map(([key, value], i) => {
              this.setState({
                //prof_img: 'http://localhost:5000/' + value.Image.imageData,

               prof_img: 'https://datingapi.herokuapp.com/' + value.Image.imageData,
                fav_movie: value.fav_movie,
                fav_band: value.fav_band,
                fav_song: value.fav_song,
                looking_for: value.looking_for,
                drinking: value.drinking,
                education: value.education,
                build: value.build,
                living_status: value.living_status,
                age: value.age,
                ideal_vaca: value.ideal_vaca,
                fav_cheese: value.fav_cheese,
                fav_timeofday: value.fav_timeofday,
                fav_mov_genre: value.fav_mov_genre,
                fav_weather: value.fav_weather,
                fav_drink: value.fav_drink,
                fav_cuisine: value.fav_cuisine,
                first_name: value.Credential.first_name,
                last_name: value.Credential.last_name
              })
            })
          })
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
  render(props) {
    return (
     <div className="profileBlock">
                {
        (this.state.loader)
        ? <Ball /> //Loader
        : ""
      } 

    <h1>Your Current Profile</h1>
    <img src={this.state.prof_img} alt="profile-image" />
    <p>First Name {this.state.first_name}</p>
    <p>Last Name: {this.state.last_name}</p>
     <p>Favorite Movie: {this.state.fav_movie}</p>
     <p>Favorite Band: {this.state.fav_band}</p>
     <p>Favorite Song: {this.state.fav_song}</p>
     <p>Looking For: {this.state.looking_for}</p>
     <p>Drinking Frequency: {this.state.drinking}</p>
     <p>Education Level: {this.state.education}</p>
     <p>Build: {this.state.build}</p>
     <p>Living Status: {this.state.living_status}</p>
     <p>Age: {this.state.age}</p>
     <p>Ideal Vacation: {this.state.ideal_vaca}</p>
     <p>Favorite Cheese: {this.state.fav_cheese}</p>
     <p>Favorite Time of Day: {this.state.fav_timeofday}</p>
     <p>Favorite Movie Genre {this.state.fav_mov_genre}</p>
     <p>Favorite Weather: {this.state.fav_weather}</p>
     <p>Favorite Cuisine: {this.state.fav_cuisine}</p>

     <NavLink to='/update-profile'>Wanna Change Something? Update Profile</NavLink>

      </div>
    );
  }
}

export default MyProfile;