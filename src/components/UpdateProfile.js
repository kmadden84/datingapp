import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const DefaultImg = process.env.PUBLIC_URL + "/images/default-image.jpg"

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multerImage: DefaultImg,
      currentUserData: "",
      currentAge: "",
      currentSong: "",
      currentDrink: "",
      currentBand: "",
      currentMovie: "",
      imageFormObj: "",
      wouldNever: "",
      education: "",
      drinking: "",
      build: "",
      livingstatus: "",
      seeking: "",
      idealvaca: "",
      favcheese: "",
      timeofday: "",
      movgenre: "",
      weather: "",
      cuisine: "",
      gender: "",
      loader: false
    }
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.postImage = this.postImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount(props) {

    var user = this.props.user;
    var pass = this.props.password;

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
          //  resolve(responseJson)
          if (responseJson != null) {
            this.setState({
              currentUserData: responseJson.user[0],
              currentAge: responseJson.user[0].age,
              currentSong: responseJson.user[0].fav_song,
              currentDrink: responseJson.user[0].fav_drink,
              currentBand: responseJson.user[0].fav_band,
              currentMovie: responseJson.user[0].fav_movie,
              multerImage: 'https://datingapi.herokuapp.com/' + responseJson.user["0"].Image.imageData
            })
          }
        })
      }).catch((error) => {
        // reject(error);
        this.props.history.push("/error")
      })


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
    this.setState(
      {
        multerImage: URL.createObjectURL(e.target.files[0]),
        imageFormObj: imageFormObj
      },
      () => this.postImage()
    );
  }

  postImage = () => {
    var user = this.props.user;
    var pass = this.props.password;
    fetch("https://datingapi.herokuapp.com/api/users/image", {
      method: "PUT",
      headers: {
        'Authorization': 'Basic ' + btoa(user + ':' + pass),
        //'Content-Type': 'application/json'
      },
      body: this.state.imageFormObj
    })
  }

  handleProfileUpdate(e, props) {
    e.preventDefault();
    var user = this.props.user;
    var pass = this.props.password;

    return new Promise((resolve, reject) => {
      fetch('https://datingapi.herokuapp.com/api/users', {
        method: "PUT",
        headers: {
          'Authorization': 'Basic ' + btoa(user + ':' + pass),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "fav_movie": this.fav_movie.value,
          "fav_band": this.fav_band.value,
          "fav_song": this.fav_song.value,
          "fav_vaca": this.state.idealvaca,
          "looking_for": this.state.seeking,
          "drinking": this.state.drinking,
          "education": this.state.education,
          "build": this.state.build,
          "living_status": this.state.livingstatus,
          "age": this.age.value,
          "ideal_vaca": this.state.idealvaca,
          "fav_cheese": this.state.favcheese,
          "fav_timeofday": this.state.timeofday,
          "fav_mov_genre": this.state.movgenre,
          "fav_weather": this.state.weather,
          "fav_drink": this.fav_drink.value,
          "fav_cuisine": this.state.cuisine,
          "gender": this.state.gender,
          "imgId": this.props.id,
          "credId": this.props.id
        })
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Your profile has been updated');
            this.props.history.push("/");
          }
          //if update unsuccessful, alert why
          else {
            response.json().then((responseJson) => {
              alert(responseJson.Error);
              resolve(responseJson)
            })
          }
        })
        .catch((error) => {
          reject(error);
        })
    }).catch(error => console.log('An error occured ', error))

  }
  handleChange(e) {
    //allowing input values to be dynamically changed.s
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(props) {
    var currentUserProps = [];
    var i;

    Object.entries(this.state.currentUserData).map(([key, value], i) => {
      currentUserProps.push(value)
    });
    [].forEach.call(document.querySelectorAll('#dropdown option'), function (elm) {
      if (currentUserProps.indexOf(elm.value) >= 0) {
        elm.setAttribute('selected', true);
      }
    });
    [].forEach.call(document.querySelectorAll('#dropdownGender option'), function (elm) {
      if (currentUserProps[4] == elm.value) {
        elm.setAttribute('selected', true);
      }
    });
    [].forEach.call(document.querySelectorAll('#dropdownSeeking option'), function (elm) {
      if (currentUserProps[5] == elm.value) {
        elm.setAttribute('selected', true);
      }
    })

    console.log(currentUserProps)
    
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
              <div className="profileInfo">
                <div className="row">

                  <img src={this.state.multerImage} alt="upload-image" className="process__image" />
                  <input
                    type="file"
                    className="process_upload-btn"
                    onChange={(e) => this.uploadImage(e, "multer")}
                    name="age"
                    ref={(input) => this.img = input}
                  />
                </div>
                <div className="row">
                  <div>
                    <input
                      type="text"
                      id="input1"
                      name="age"
                      ref={(input) => this.age = input}
                      placeholder={this.state.currentAge} />
                  </div>
                </div>
                <div className="row">
                  <select name="gender" id="dropdownGender" className="gender" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>I am a... </option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                  </select>
                  <select name="seeking" id="dropdownSeeking" className="seeking" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>I'm looking for a... </option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Doesn't Matter">I'm not choosy</option>
                  </select>
                </div>

                <div className="row">
                  <div>
                    <input
                      type="text"
                      id="input2"
                      name="movie"
                      ref={(input) => this.fav_song = input}
                      placeholder={this.state.currentSong} />
                  </div>
                  <div>
                    <input type="text"
                      name="song"
                      id="input3"
                      ref={(input) => this.fav_drink = input}
                      placeholder={this.state.currentDrink} />
                  </div>
                </div>
                <div className="row">
                  <select name="drinking" id="dropdown" className="drinking" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>How often do you drink?</option>
                    <option value="Never">Never</option>
                    <option value="Rarely">Rarely</option>
                    <option value="Occassionally">Occassionaly</option>
                    <option value="Often">Often</option>
                    <option value="Alcoholic">Borderline Alcoholic</option>
                  </select>
                  <select name="education" id="dropdown" className="education" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Highest Education Level</option>
                    <option value="Grammer School">Grammar School</option>
                    <option value="High School">High School</option>
                    <option value="College Diploma">College Diploma</option>
                    <option value="Some University">Some University</option>
                    <option value="Bachelor's Degree">Bachelors Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div className="row">
                  <select name="build" id="dropdown" className="build" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Build</option>
                    <option value="Thin">Thin</option>
                    <option value="Average">Avarege</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Muscular">Muscular</option>
                    <option value="Fat">Fat</option>
                    <option value="Obese">Morbidly Obese</option>
                  </select>
                  <select name="livingstatus" id="dropdown" className="livingstatus" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Living Stayus</option>
                    <option value="Alone">Alone</option>
                    <option value="With Roommates">Roommates</option>
                    <option value="With Family">Live with family</option>
                  </select>
                </div>
                <div className="row">
                  <select name="idealvaca" id="dropdown" className="idealvaca" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Ideal Vacation...</option>
                    <option value="Rustic Campingc">Rustic Camping</option>
                    <option value="Cozy Cabin">Cozy Cabin in the Woods</option>
                    <option value="Caribbean Resort">5 Star Caribbean Resort</option>
                    <option value="European Bakpacking">European Backpacking</option>
                    <option value="Asian Backpacking">Asian Backpacking</option>
                    <option value="Doing Nothing">Doing Nothing at Home</option>
                  </select>
                  <select name="favcheese" id="dropdown" className="favcheese" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Favorite Cheese</option>
                    <option value="I Hate Cheese">I hate Cheese</option>
                    <option value="Cheddar">Cheddar</option>
                    <option value="Mozerella">Mozerella</option>
                    <option value="Motterey Jack">Motterey Jack</option>
                    <option value="Gouda">Gouda</option>
                    <option value="Brie">Brie</option>
                    <option value="Parmesan">Permesan</option>
                  </select>
                </div>
                <div className="row">
                  <select name="timeofday" id="dropdown" className="timeofday" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Favorite Time of Day</option>
                    <option value="Mornings">Mornings</option>
                    <option value="Afternoons">Afternoons</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Dead of Night">Dead of night</option>
                  </select>
                  <select name="movgenre" id="dropdown" className="movgenre" onChange={this.handleChange}>
                    <option value="" selected disabled hidden>Favorite Movie Genre</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Dramedy">Dramedy</option>
                    <option value="Romantic Comedy">Romantic Comedies</option>
                    <option value="Horror">Horror</option>
                  </select>
                </div>
                <div className="row">

                <select name="weather" id="dropdown" className="weather" onChange={this.handleChange}>
                  <option value="" selected disabled hidden>Favorite Time of Day</option>
                  <option value="Stormy">Stormy</option>
                  <option value="Sunny & Hot">Sunny & Hot</option>
                  <option value="Sunny & Cold">Sunny & Cold</option>
                  <option value="Snowing">Snowing</option>
                  <option value="Apocalyptic">Apocalyptic</option>
                </select>
                <select name="cuisine" id="dropdown" className="cuisine" onChange={this.handleChange}>
                  <option value="" selected disabled hidden>Favorite Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="American">American</option>
                </select>
                </div>
              </div>
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="fav_band"
                    ref={(input) => this.fav_band = input}
                    placeholder={this.state.currentBand} />
                </div>
                <div>
                  <input
                    type="text"
                    name="fav_movie"
                    ref={(input) => this.fav_movie = input}
                    placeholder={this.state.currentMovie} />
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.handleProfileUpdate}>Save</button>
                <NavLink className="button button-secondary" to="/">Cancel</NavLink>
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
export default UpdateProfile;