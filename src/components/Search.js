import React, { Component } from 'react';
//import $ from 'jquery';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wouldNever: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({
      wouldNever: e.target.value
    });
  }

  handleSubmit(e, props) {
    e.preventDefault();
    if (!this.fav_movie.value || !this.fav_tvshow.value || !this.fav_vaca.value || !this.fav_band.value || !this.fav_song.value || !this.state.wouldNever) {
      alert('All Fields Required')
    } else {
      this.props.submit({"Movie":this.fav_movie.value,"TVShow":this.fav_tvshow.value,"Vaca":this.fav_vaca.value,"Band":this.fav_band.value,"Song":this.fav_song.value,"Never":this.state.wouldNever})
    }
  }

  render(props) {

    return (

<div className="formSearch">
      <h1>Let's find your match...</h1>

      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="text"
          name="movie"
          ref={(input) => this.fav_movie = input}
          placeholder="Favorite Movie" />
      <input type="text"
          name="tvshow"
          ref={(input) => this.fav_tvshow = input}
          placeholder="Favorite TV Show" 
          />
      <input type="search"
          name="vaca"
          ref={(input) => this.fav_vaca = input}
          placeholder="Favorite Vacation" />
      <input type="search"
          name="band"
          ref={(input) => this.fav_band = input}
          placeholder="Favorite Band" />
      <input type="search"
          name="song"
          ref={(input) => this.fav_song = input}
          placeholder="Favorite Song" />

<select className="wouldNever" onChange ={this.handleChange}>
<option value="" selected disabled hidden>Select something you'd never do...</option>
  <option value="skydive">Skydive</option>
  <option value="bugs">Eat Bugs</option>
  <option value="phone">Go without my phone for a month</option>
  <option value="car">Go without my car for a month</option>
  <option value="car">Go without my headphones for a month</option>
</select>
        <button type="submit" id="submit" className="search-button">Find Your Match...</button>
      </form>
      </div>
    );
  }
}
export default Search;