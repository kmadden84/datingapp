import React, { Component } from 'react';
import Home from './components/Home';
import UserSignIn from './components/UserSignIn';
import SearchPage from './components/SearchPage';
import Search from './components/Search';
import UserSignUp from './components/UserSignUp';
import UpdateProfile from './components/UpdateProfile';
import CreateAccount from './components/CreateAccount';
import MyProfile from './components/MyProfile';
import UserSignOut from './components/UserSignOut';
import UserDetails from './components/UserDetails';
import NoResults from './components/NoResults';


// import NoResults from './components/NoResults';
// import Forbidden from './components/Forbidden';


import Header from './components/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: (Cookies.get("id")) ? Cookies.get("id") : "",
      username: (Cookies.get("name")) ? Cookies.get("name") : "",
      password: (Cookies.get("password")) ? Cookies.get("password") : "",
      firstName: (Cookies.get("firstName")) ? Cookies.get("firstName") : "",
      lastName: (Cookies.get("lastName")) ? Cookies.get("lastName") : "",
      detailsLoader: "",
      searchParams: {}
    }
    this.signIn = this.signIn.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    // this.clearState = this.clearState.bind(this);
  }

  handleStateChange = ({ ...data }) => {
    this.setState(prevState => {
    }, function () {
      this.setState({
        searchParams: data
      });
      this.props.history.push("/search-results");
    })
  }
  signIn = (user, pass) => {
    this.setState({
      loader: true,
    });
    return new Promise((resolve, reject) => {
      fetch("https://datingapi.herokuapp.com/api/creds", {
        method: "GET",
        mode: 'cors',
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(user + ':' + pass)
        }),
      })
        .then((response) => {
          this.setState({
            loader: false,
          });
          response.json().then((responseJson) => {
            console.log(responseJson)
            if (response.status === 200) {
              Cookies.set('name', user, { path: '/' });
              Cookies.set('password', pass, { path: '/' });
              Cookies.set('firstName', responseJson["First Name"], { path: '/' });
              Cookies.set('lastName', responseJson["Last Name"], { path: '/', });
              Cookies.set('id', responseJson["id"], { path: '/', });

              this.setState({
                id: responseJson["id"],
                firstName: responseJson["First Name"],
                lastName: responseJson["Last Name"],
                username: user,
                password: pass
              });

              console.log(this.state)
              console.log(this.state.lastName)
            }
            if (response.status === 401) {
              alert(responseJson.Error)
            }

            //this.props.history.push("/search");
            // if (this.props.history.location.pathname !== "/signin") {
            //   history.goBack()
            // } else {
            //   history.goBack()
            // }
          })
        }).catch((error) => {
          reject(error);
          //redirect to error page
          this.props.history.push("/error");
        })
    })
  }
  clearState = (props) => {
    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    });
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = { path: '' };
      Cookies.remove(cookieName, neededAttributes);
    });

    this.props.history.push("/");
  }

  render(props) {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      //setting private Routes
      <Route {...rest} render={(props) => (
        this.state.username !== ""
          ? <Component {...props} password={this.state.password} user={this.state.username} id={this.state.id} submit={this.handleStateChange} />
          : <Redirect to='/signin' />
      )} />
    )
    return (
      <div>
        <Route path="*" render={(props) => <Header currentState={this.state} signout={this.clearState} {...props} />} />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path={`${this.props.match.path}signin`} render={(props) => <UserSignIn loader={this.state.loader} currentState={this.state} userdata={this.signIn} {...props} />} />
     <Route exact path={`${this.props.match.path}search-results`} render={(props) => <SearchPage searchData={this.state.searchParams} currentState={this.state} userdata={this.signIn} {...props} />} />
          <Route exact path={`${this.props.match.path}signup`} render={(props) => <UserSignUp userdata={this.signIn} {...props} />} />
          <PrivateRoute path={`${this.props.match.path}create-account`} component={CreateAccount} />
          <PrivateRoute exact path={`${this.props.match.path}my-profile`} component={MyProfile} />
          <PrivateRoute exact path={`${this.props.match.path}update-profile`} component={UpdateProfile} />
          <Route path={`${this.props.match.path}signout`} exact={true} render={(props) => <UserSignOut signout={this.clearState} {...props} />} />
          <Route exact path={`${this.props.match.path}users/:id`} render={(props) => <UserDetails password={this.state.password} user={this.state.username} {...props} />} />
          <Route path='*' exact={true} component={NoResults} />

          {/* 
          <Route exact path={`${this.props.match.path}search`} render={(props) => <Search submit={this.handleStateChange} currentState={this.state} userdata={this.signIn} {...props} />} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path='/forbidden' exact={true} component={Forbidden} />
          <Route path='/error' exact={true} component={Error} />
            */}
        </Switch>
      </div>
    );
  }
}


export default App;
