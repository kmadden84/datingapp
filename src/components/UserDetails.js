import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';
import { Ball } from './UserSignIn';
//import ReactMarkdown from 'react-markdown/with-html'
import Modal from 'react-responsive-modal';
import customAnimationStyles from 'react-responsive-modal';


class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userContent: "",
      creator: "",
      redirect: false,
      loader: true,
      open: false,
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  sendMessage = (e) => {
    e.preventDefault();

    this.onCloseModal();
    return new Promise((resolve, reject) => {
      var user = this.props.user;
      var pass = this.props.password;
      fetch('https://datingapi.herokuapp.com/api/users/messages', {
        //fetch('http://localhost:5000/api/users/messages', {
        method: "POST",
        mode: "cors",
        headers: {
          'Authorization': 'Basic ' + btoa(user + ':' + pass),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "message": this.message.value,
          "recipient": this.state.userContent[0].id,
          "subject": this.subject.value
        })
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
            alert('Message Sent! ')
            response.json().then((responseJson) => {
              resolve(responseJson)
            })
          }
        })
        .catch((error) => {
          reject(error);
          this.props.history.push("/error");
        })
    })
  }



  componentDidMount(props) { // Loading course details on mount
    console.log('hi')
    return new Promise((resolve, reject) => {
      var target = this.props.match.params;
      target = target.id;
      fetch('https://km-dating-app.herokuapp.com/' + target + '', {
        //fetch('http://localhost:5000/api/users/' + target + '', {
        method: "GET",
        mode: "cors",
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
              resolve(responseJson)
              if (responseJson) { //IF there's a user, set course content and creator
                this.setState({
                  userContent: responseJson,
                })
                console.log(this.state.userContent)

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
    var last_name = "";

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

    const { open } = this.state

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

        <button className="msgButton" onClick={this.onOpenModal}>Send {first_name} a Message!</button>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{
            transitionEnter: customAnimationStyles.transitionEnter,
            transitionEnterActive: customAnimationStyles.transitionEnterActive,
            transitionExit: customAnimationStyles.transitionExitActive,
            transitionExitActive: customAnimationStyles.transitionExitActive,
          }}
        >
          <form>
            <div className="row">
              <div>
                <input
                  type="text"
                  name="subject"
                  ref={(input) => this.subject = input}
                  placeholder="Subject" />
              </div>
              <div>
                <textarea
                  ref={(input) => this.message = input}
                  name="message"
                  placeholder="Your message" >
                </textarea>
              </div>
            </div>
            <button className="button" type="submit" onClick={this.sendMessage}>Save</button>
          </form>
        </Modal>
      </div>
    );

  }
}

export default UserDetails;
