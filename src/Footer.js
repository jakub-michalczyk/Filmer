import React from 'react';
import './App.css';

class Footer extends React.Component{
  constructor(){
    super();
    this.state = {};

  }

  render(){
    return (
    <footer className="footer">
        <div>Made with <span>TVmaze API</span></div>
    </footer> 
    )
  }
}

export default Footer;
