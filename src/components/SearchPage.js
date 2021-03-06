import React, { Component } from 'react';
import Search from './Search';
import '../index.css';
import { NavLink } from 'react-router-dom';
import {Ball} from './UserSignIn';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      user_content: "",
      results_content: "",
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
      gender: ""
    }
    this.searchPeople = this.searchPeople.bind(this);
  }
  componentDidMount(props) {
    //console.log(this.props.currentState["username"])

    new Promise((resolve, reject) => {
    var user = this.props.currentState.username;
    var pass = this.props.currentState.password;
   // fetch('http://localhost:5000/api/users/', {

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
          if (responseJson.user.length !== 0) {
            
            const _this = this;
            _this.setState({
              loader: false,
              user_content: responseJson.user,
              creator: responseJson.user[0].Credential.username
            }, () => {
              this.searchPeople(this.state.user_content)
            });

          } else {
            alert('You need to create your profile to see your matches')
            this.props.history.push("/create-account")
          }
        })
      }).catch((error) => {
        // reject(error);
        this.props.history.push("/error")
      })
    })
  }

searchPeople(state) {
  var movie = state[0].fav_movie;
  var band = state[0].fav_band;
  var song = state[0].fav_song;
  var vaca = state[0].ideal_vaca;
  var drinking = state[0].drinking;
  var education = state[0].education;
  var seeking = state[0].looking_for;
  var build = state[0].build;
  var livingstatus = state[0].living_status;
  var age = state[0].age;
  var fav_cheese = state[0].fav_cheese;
  var tod = state[0].fav_timeofday;
  var movgenre = state[0].fav_mov_genre;
  var weather = state[0].fav_weather;
  var favdrink = state[0].fav_drink;
  var cuisine = state[0].fav_cuisine;
  var gender= state[0].gender;
  var id = this.props.currentState.id;
console.log(movie)
 // var url = "http://localhost:5000/api/users/search?movie="+ movie +
  var url = "https://datingapi.herokuapp.com/api/users/search?movie="+ movie +
    '&band=' + band +
    '&song=' + song +
    '&vaca=' + vaca +
    '&drinking=' + drinking +
    '&education=' + education +
    '&seeking=' + seeking +
    '&build=' + build +
    '&living=' + livingstatus +
    '&age=' + age +
    '&cheese=' + fav_cheese +
    '&timeofday=' + tod +
    '&movgenre=' + movgenre +
    '&weather=' + weather +
    '&favdrink=' + favdrink +
    '&cuisine=' + cuisine +
    '&id=' + id +
    '&gender=' + gender;

url = url.replace(/ /g,"%20");

  console.log(url)

  fetch(url, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      response.json().then((responseJson) => {
        console.log(responseJson)
        if (responseJson.results.rows !== 'undefined') {
         
          this.setState({
            results_content: responseJson.results.rows,
            pages: responseJson.pages
          });
        }
        // resolve(responseJson)
        if (responseJson) {
          console.log(this.state.results_content)
        }
      })
    })
    .catch((error) => {
      // reject(error);
      this.props.history.push("/error")
    })
}








render(props) {

  var dealTile = [];

  for (var i = 0; i < this.state.results_content.length; i++) {
    var name = this.state.results_content[i].Credential.first_name;
    var movie = this.state.results_content[i].fav_movie;
    var song = this.state.results_content[i].fav_song;
    var age = this.state.results_content[i].age;
    var id = this.state.results_content[i].id;
    var imgUrl = this.state.results_content[i].Image.imageData;
        imgUrl = imgUrl.replace('\\', '/');

    var prof_img = 'https://datingapi.herokuapp.com/' + imgUrl;
    //var prof_img = 'http://localhost:5000/' + imgUrl;
    const divStyle = {
      backgroundImage: 'url(' + prof_img + ')',
    };
    dealTile.push(
      <NavLink className="course--module course--link" to={`/users/${id}/`}>
      <div className="personTitle" key={i}>
        <div className="personTile_persimImg" style={divStyle}></div>
        <div className="bioInfo">
          <div className="perstonTile_name">Name: {name}</div>
          <div className="perstonTile_age">Age: 32</div>
          <div className="perstonTile_movie">Movie: {movie}</div>
          <div className="perstonTile_song">Song: {song}</div>
        </div>
      </div>
      </NavLink>
    )
  }

  return (
    
    <div className="results">
           {
        (this.state.loader)
        ? <Ball /> //Loader
        : ""
      } 
      {dealTile}

    </div>

  );
}
}
