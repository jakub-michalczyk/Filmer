import React from 'react';
import './App.css';

class SearchBarBox extends React.Component{
  constructor(){
    super();
    this.state = {};

  }

  render(){
    return (
    <div className="searchBarBoxFiltered">
      <input type="text" onChange={this.props.update} value={this.props.search}/><button onClick={this.props.get} className="btn">Szukaj</button>
    </div> 
    )
  }
}

export default SearchBarBox;
