import React from 'react';
import './App.css';
import language from "./images/language.png";
import text from "./images/text.png";
import site from "./images/site.png";
import movie from "./images/movie.png";
import date from "./images/date.png";

class MovieBox extends React.Component{
  constructor(){
    super();
    this.state = {};

  }

  render(){
    return (
    <div className="movieBox">
       <div className="movieImg">
          <img src={`${this.props.movie.show.image !== null ? this.props.movie.show.image.medium : `${require("./images/noAvaiable.png")}`}`} alt="Movie thumbnail" />
        </div>
        <div className="movieInfo">
            <ul>
              <li className="titles">
                <span><img src={language} alt="Language icon" /><span className="movieBoxText">Language:</span></span>
                <span><img src={text} alt="Language icon"/><span className="movieBoxText">Name:</span></span>
                <span><img src={site} alt="Name icon"/><span className="movieBoxText">Premiered:</span></span>
                <span><img src={movie} alt="Movie icon"/><span className="movieBoxText">Type:</span></span>
                <span><img src={date} alt="Date icon"/><span className="movieBoxText">Official site:</span></span>
              </li>
              <li className="descs">
                <span>{this.props.movie.show.language}</span>
                <span>{this.props.movie.show.name}</span>
                <span>{this.props.movie.show.premiered}</span>
                <span>{this.props.movie.show.type}</span>
                <span><a href={this.props.movie.show.officialSite} target="_blank" rel="noopener noreferrer">Go to movie site</a></span>
              </li>
            </ul>
        </div>
    </div> 
    )
  }
}

export default MovieBox;
