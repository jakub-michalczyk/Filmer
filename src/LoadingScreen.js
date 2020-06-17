import React from 'react';
import './App.css';
import icon from "./images/icon.png";

class LoadingScreen extends React.Component{
  constructor(){
    super();
    this.state = {
    };
  }

  render(){
    return (
    <div className="loadingScreen" style={{transition: "all .3s", opacity: this.props.on ? "0" : "1"}}>
        <h2>
            <img src={icon} alt="Icon"/>
            filmer.<span>io</span>
        </h2>
    </div> 
    )
  }
}

export default LoadingScreen;
