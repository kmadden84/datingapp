import React, { Component } from 'react';
import Search from './Search';
import '../index.css';

// import { keyframes } from 'styled-components';
// import styled from 'styled-components';

// export const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;
// export const Ball = styled.div`
//   border: 16px solid #f3f3f3;
//   border-radius: 50%;
//   border-top: 16px solid blue;
//   border-right: 16px solid green;
//   border-bottom: 16px solid red;
//   width: 30px;
//   height: 30px;
//   -webkit-animation: spin 2s linear infinite;
//   animation: ${spin} 2s linear infinite;
//   position: relative;
//   left: 47%;
//   top: 200px;
// `;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          //  resolve(responseJson)
          if (responseJson.user.length !== 0) {
            const _this = this;
            _this.setState({
              user_content: responseJson.user,
              creator: responseJson.user[0].Credential.username
            }, () => {
              this.searchPeople(this.state.user_content)
            });
            console.log(this.state.user_content)

            //console.log(responseJson.user[0].first_name)
            // if (this.props.user !== this.state.creator) {
            //   // alert('Only the content creator may update this course')
            //   this.props.history.push("/forbidden");
            //  }
            //setting states to manage course fields
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

  console.log(state[0].age)
  // Object.entries(state).map(([key, value], i) => {
  //   this.setState({
  //     fav_movie: value.fav_movie,
  //     fav_band: value.fav_band,
  //     fav_song: value.fav_song,
  //     looking_for: value.looking_for,
  //     drinking: value.drinking,
  //     education: value.education,
  //     build: value.build,
  //     living_status: value.living_status,
  //     age: value.age,
  //     ideal_vaca: value.ideal_vaca,
  //     fav_cheese: value.fav_cheese,
  //     fav_timeofday: value.fav_timeofday,
  //     fav_mov_genre: value.fav_mov_genre,
  //     fav_weather: value.fav_weather,
  //     fav_drink: value.fav_drink,
  //     fav_cuisine: value.fav_cuisine,
  //     first_name: value.Credential.first_name,
  //     last_name: value.Credential.last_name
  //   })
 // })

  //console.log(this.state.fav_movie)

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
console.log(id)
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
//sParameter = encodeURIComponent(sParameter.trim()) //"Test%20-%20Text"


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
          console.log(this.state.content)
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
    var imgUrl = this.state.results_content[i].Image.imageData;
        imgUrl = imgUrl.replace('\\', '/');

    var prof_img = 'http://localhost:5000/' + imgUrl;

    const divStyle = {
      backgroundImage: 'url(' + prof_img + ')',
    };
    dealTile.push(
      <div className="personTitle" key={i}>
        <div className="personTile_persimImg" style={divStyle}></div>
        <div className="bioInfo">
          <div className="perstonTile_name">{name}</div>
          <div className="perstonTile_age">32</div>
          <div className="perstonTile_movie">{movie}</div>
          <div className="perstonTile_song">{song}</div>
        </div>

      </div>
    )
  }



  //   if (this.state.content[i].snapshots && this.state.content[i].snapshots.product_price < this.state.content[i].product_price) {
  //     topDeals.push(
  //       <div className="grid-33" key={i}>
  //         <a className="course--module course--link" target="_blank" href={fullLink}>
  //           <h3 className="content--title">{title}</h3>
  //           <h3 className="content--price">{price} <span className="newPrice">{this.state.content[i].snapshots.price}</span></h3>
  //         </a>
  //       </div>
  //     )
  //   }
  //   let childArray = this.state.content[i];
  //   for (let j = 0; j < childArray.length; j++) {
  //     var price = childArray[j].product_price;
  //     var title = childArray[j].product_title;
  //     var link = childArray[j].product_urlCode;
  //     switch (childArray[j].merchant_id) {
  //       case 1:
  //         merchant = "Amazon.ca"
  //         break;
  //       case 2:
  //         merchant = "Best Buy"
  //         break;
  //       case 3:
  //         merchant = "Walmart"
  //         break;
  //       case 4:
  //         merchant = "Toys R Us"
  //         break;
  //       case 5:
  //         merchant = "EB Games"
  //         break;
  //       case 6:
  //         merchant = "Think Geek"
  //         break;
  //       case 7:
  //         merchant = "One Plus"
  //         break;
  //       case 8:
  //         merchant = "Amazon Japan"
  //         break;
  //       case 9:
  //         merchant = "Amazon Us"
  //         break;
  //       default:
  //     }
  //     if (link != undefined) {
  //       var fullLink = "//bit.ly/" + link;
  //     }
  //     if (price > 0) {
  //       dealTile.push(
  //         <div className="grid-33" key={j}>
  //           <a className="course--module course--link" target="_blank" href={fullLink}>
  //             <h3 className="content--price">{merchant}</h3>
  //             <h3 className="content--title">{title}</h3>
  //             <h3 className="content--price">{price}</h3>
  //           </a>
  //         </div>
  //       )
  //     }
  //   }


  return (
    <div className="results">

      {dealTile}



    </div>

  );
}
}
