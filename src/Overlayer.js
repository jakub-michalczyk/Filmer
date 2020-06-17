import React from 'react';
import './App.css';

class Overlayer extends React.Component{
  constructor(){
    super();
    this.state = {};

  }

  render(){
    return (
    <div className={`overlayer${this.props.on ? " overlayerTop" : "" }`}>
      
    </div> 
    )
  }
}

export default Overlayer;
