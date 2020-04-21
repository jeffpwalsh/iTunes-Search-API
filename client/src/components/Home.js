import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <img
          src="./ituneslogo.png"
          alt="ituneslogo"
          width="150px"
          height="150px"
        />
        <h1>Welcome to iTunes Search</h1>
        <p> please select</p>
        <Link to="/music">
          <button className="link">
            <i class="fas fa-headphones"></i> music
          </button>
        </Link>
        <Link to="/movies">
          <button className="link">
            {" "}
            <i class="fa fa-film"></i> movies
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
