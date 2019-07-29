import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render(props) {
    var userData = []
    Object.keys(this.props.currentState).map(i =>
      userData.push(this.props.currentState[i])
    )
      console.log(userData)
console.log(userData[6].length)
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">TopMatch</h1>


         

          <nav>
          {
              (this.props.currentState.username !== "")
        <NavLink to='/messages' className="msgCount"> <sup className="msgNumber"><span>{userData[6].length}</span></sup><i class="fas fa-envelope"></i></NavLink>
        :""
            }

          {
              (this.props.currentState.username !== "")
                ? <NavLink to='/search-results' className="signup">My Matches</NavLink>
                :""
            }

            {
              (this.props.currentState.username !== "")
                ? <NavLink to='/my-profile' className="signup">Welcome {userData[3]} {userData[4]}!</NavLink>
                : <NavLink to='/signup' className="signup">Sign Up</NavLink>
            }
            {
              (this.props.currentState.username  !== "")
                ? <NavLink to='/signout' className="signout">Sign Out</NavLink>
                : <NavLink to='/signin' className="signin">Sign In</NavLink>
            }
          </nav>
        </div>
      </div>
    );
  }
}
export default Header;