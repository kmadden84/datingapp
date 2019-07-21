import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import {Ball} from './UserSignIn';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseContent: "",
      loader: true
    }
  }
  componentDidMount(props) {
    // return new Promise((resolve, reject) => {
    //   fetch("http://localhost:5000/api/courses", {
    //     method: "GET",
    //     mode: "cors",
    //   })
    //     .then((response) => {
    //       this.setState({
    //         loader: false
    //       });
    //       if (response.status === 200) {
    //         this.setState({
    //           successful: true
    //         });
    //       }
    //       response.json().then((responseJson) => {
    //         resolve(responseJson)
    //         if (responseJson) {
    //           this.setState({
    //             courseContent: responseJson
    //           });
    //         }
    //       })
    //     })
    //     .catch((error) => {
    //       reject(error);
    //       this.props.history.push("/error")
    //     })
    // })
  }
  render(props) {
    var courseTile = [];

    //mapping coure content, pushing HTML to courseTile

    // for (var i = 0; i < this.state.courseContent.length; i++) {
    //   var id = this.state.courseContent[i].id;
    //   var title = this.state.courseContent[i].title;
    //   courseTile.push(
    //     <div className="grid-33" key={i}>
    //       <NavLink className="course--module course--link" to={`/courses/${id}/`}>
    //         <h4 className="course--label">Course</h4>
    //         <h3 className="course--title">{title}</h3>
    //       </NavLink>
    //     </div>
    //   )
    // }
    return (
      <div className="persons">
        <div className="personTitle judy">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">      <div className="perstonTile_name">Judy</div>
            <div className="perstonTile_age">30</div>
            <div className="perstonTile_movie">Unforgiven</div>
            <div className="perstonTile_song">Dancing in the Dark</div></div>


        </div>
        <div className="personTitle jared">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">      <div className="perstonTile_name">Jared</div>
            <div className="perstonTile_age">28</div>
            <div className="perstonTile_movie">Raiders of the Lost Ark</div>
            <div className="perstonTile_song">A Day in the Life</div></div>


        </div>
        <div className="personTitle cindy">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">      <div className="perstonTile_name">Cindy</div>
            <div className="perstonTile_age">32</div>
            <div className="perstonTile_movie">A Fish Called Wanda</div>
            <div className="perstonTile_song">With A Little Help From My Friends</div></div>


        </div>
        <div className="personTitle mark">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">      <div className="perstonTile_name">Mark</div>
            <div className="perstonTile_age">24</div>
            <div className="perstonTile_movie">Avengers Endgame</div>
            <div className="perstonTile_song">Bad Romance</div></div>


        </div>
        <div className="personTitle liz">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">      <div className="perstonTile_name">Elizabeth</div>
            <div className="perstonTile_age">33</div>
            <div className="perstonTile_movie">Bridget Jones' Diary</div>
            <div className="perstonTile_song">Stormy Weather</div></div>

        </div>
        <div className="personTitle mike">
          <div className="personTile_persimImg"></div>
          <div className="bioInfo">
            <div className="perstonTile_name">Mike</div>
            <div className="perstonTile_age">35</div>
            <div className="perstonTile_movie">Heat</div>
            <div className="perstonTile_song">When I'm 64</div></div>

        </div>
      </div>
    );
  }
}

export default Home;
