import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Ball } from './UserSignIn';
//import ReactMarkdown from 'react-markdown/with-html'

class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userContent: "",
      creator: "",
      currentCourse: "",
      redirect: false,
      loader: true,
    }
  }
  componentDidMount(props) { // Loading course details on mount
    console.log('hi')
    return new Promise((resolve, reject) => {
      var target = this.props.match.params;
      target = target.id;
      this.setState({
        currentCourse: target
      });
      fetch('https://datingapi.herokuapp.com/api/users/' + target + '', {
        method: "GET",
        mode: "cors",
      })
        .then((response) => {
          console.log(response)
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
                  userContent: responseJson,
                  creator: responseJson[0].Credential.username
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

    var prof_img = "";
    var fav_movie = "";
    var fav_band = "";
    var fav_song = "";
    var looking_for = "";
    var drinking = "";
    var education = "";
    var build = "";
    var living_status = "";
    var age = "";
    var ideal_vaca = "";
    var fav_cheese = "";
    var fav_timeofday = "";
    var fav_mov_genre = "";
    var fav_weather = "";
    var fav_drink = "";
    var fav_cuisine = "";
    var first_name = "";
    var  last_name = "";

    Object.entries(this.state.userContent).map(([key, value], i) => {
        prof_img = 'https://datingapi.herokuapp.com/' + value.Image.imageData;
        fav_movie = value.fav_movie;
        fav_band = value.fav_band;
        fav_song = value.fav_song;
        looking_for = value.looking_for;
        drinking = value.drinking;
        education = value.education;
        build = value.build;
        living_status = value.living_status;
        age = value.age;
        ideal_vaca = value.ideal_vaca;
        fav_cheese = value.fav_cheese;
        fav_timeofday = value.fav_timeofday;
        fav_mov_genre = value.fav_mov_genre;
        fav_weather = value.fav_weather;
        fav_drink = value.fav_drink;
        fav_cuisine = value.fav_cuisine;
        first_name = value.Credential.first_name;
        last_name = value.Credential.last_name;
    })

    if (this.state.redirect) {
      this.props.history.push("/notfound");
    }

    return (

      <div className="profileBlock">
      <img src={prof_img} alt="profile-image" />
      <p>First Name {first_name}</p>
      <p>Last Name: {last_name}</p>
       <p>Favorite Movie: {fav_movie}</p>
       <p>Favorite Band: {fav_band}</p>
       <p>Favorite Song: {fav_song}</p>
       <p>Looking For: {looking_for}</p>
       <p>Drinking Frequency: {drinking}</p>
       <p>Education Level: {education}</p>
       <p>Build: {build}</p>
       <p>Living Status: {living_status}</p>
       <p>Age: {age}</p>
       <p>Ideal Vacation: {ideal_vaca}</p>
       <p>Favorite Cheese: {fav_cheese}</p>
       <p>Favorite Time of Day: {fav_timeofday}</p>
       <p>Favorite Movie Genre {fav_mov_genre}</p>
       <p>Favorite Weather: {fav_weather}</p>
       <p>Favorite Cuisine: {fav_cuisine}</p>
  
        </div>
    );

  }
}

export default UserDetails;
