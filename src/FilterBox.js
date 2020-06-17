import React from 'react';
import './App.css';
import icon from "./images/icon.png";
import close from "./images/close.png";
import info from "./images/info.png";
import noImage from "./images/noAvaiable.png"

class FilterBox extends React.Component{
  constructor(){
    super();
    this.state = {
        searchTerm: "",
        found: "",
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.findShow = this.findShow.bind(this);
    this.specifiedInfo = this.specifiedInfo.bind(this);
  }

  updateSearchTerm(e){
    this.setState({
        searchByID: true
    });
    this.setState({
        searchTerm: e.target.value
    });
  }

  async findShow(){
    let data;
    let fetched;

    try{
        data = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${this.state.searchTerm}`);
        fetched = await data.json();

        this.setState({
            found: fetched
        });
    }
    catch(e){
        this.setState({
            found: "No matches found for your search"
        });
    }
  }

  generateFoundShow(){
      return <div className="found">
          <div className="foundWrapper">
            <div className="imgBox"><img src={this.state.found.image !== undefined ? this.state.found.image.medium : noImage} alt="Movie thumbnail"/></div>
            <div className="showTitle">{this.state.found.name}</div>
          </div>
          <div className="moreInfo" onClick={this.props.get}>Get info about this show</div>
      </div>
  }

  specifiedInfo(){
    if(this.state.found !== ""){
        //Show user first finding from his search
        this.props.spec(this.state.found)
    }
  }

  render(){
    return (
    <div className="filterBox">
        <div className="close"><img onClick={this.props.off} src={close} alt="Close"/></div>
        <h2>
            <img src={icon} alt="Logo"/>filmer.<span>io</span>
        </h2>
        <div className="searchWrapper">
            <p><img src={info} alt="Information"/>Type show's id or just it's name to get more specified information about it</p>
            <div className="inputsWrapper">
                <input type="text" onChange={this.updateSearchTerm} placeholder="Show's name"/>
            </div>
            <div className="searchResult" onClick={this.specifiedInfo}>{typeof this.state.found === "string" ? this.state.found : this.generateFoundShow()}</div>
            <button className="btn" onClick={this.findShow}>Szukaj</button>
        </div>
    </div> 
    )
  }
}

export default FilterBox;
