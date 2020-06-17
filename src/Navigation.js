import React from 'react';
import './App.css';
import icon from "./images/icon.png";
import filterIcon from "./images/filter.png";
import filterIconG from "./images/filterGreen.png";

class Navigation extends React.Component{
  constructor(){
    super();
    this.state = {
      imgSrc: filterIcon
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  changeIcon(){
    this.setState({
      imgSrc: this.state.imgSrc === filterIcon ? filterIconG : filterIcon
    })
  }

  render(){
   
    return (
    <nav className={`menu${this.props.searchedFlag ? " staticPos" : ""}`}>
      <ul>
          <li className="logo"><img src={icon} alt="Logo"/>filmer.<span>io</span></li>
          <li className="specifyFilters" onClick={this.props.filt} onMouseOver={this.changeIcon} onMouseOut={this.changeIcon}>
            <img src={this.state.imgSrc} alt="Filter icon"/>
             Show's episodes
          </li>
      </ul>
    </nav> 
    )
  }
}

export default Navigation;
