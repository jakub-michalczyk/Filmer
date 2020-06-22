import React from 'react';
import './App.css';
import Navigation from "./Navigation";
import SearchBarBox from './SearchBarBox';
import MovieBox from "./MovieBox";
import Footer from "./Footer";
import Overlayer from "./Overlayer";
import FilterBox from "./FilterBox";
import MoviePage from "./MoviePage";
import LoadingScreen from "./LoadingScreen";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchTerm: "",
      searched: false,
      shows: [],
      filteredOn: false,
      specifiedSearch: null,
      loading: false,
      loadingHide: false,
      appClassName: "App"
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.getValue = this.getValue.bind(this);
    this.filterOn = this.filterOn.bind(this);
    this.getSpecifiedSearch = this.getSpecifiedSearch.bind(this);
    this.handleBtn = this.handleBtn.bind(this)
  }

  async getValue(){
    if(this.state.searched !== ""){
      await this.showLoadingScreen();
      let data = await fetch(`http://api.tvmaze.com/search/shows?q=${this.state.searchTerm}`);
      let fetched = await data.json();
   
      await this.setState({
        shows: await fetched,
        searched: await true
      });
  
      await this.hideLoadingScreen();
    }

  }

  hideLoadingScreen(){
    setTimeout(
      async () => {
        await this.setState({
          loadingHide: true
        });
    
        await this.setState({
          loading: false
        });

        await this.setState({
          appClassName: "App"
        });
      }
    , 1000)
  }

  async showLoadingScreen(){
    await this.setState({
      appClassName: "App noScroll"
    });
    
    await this.setState({
      loading: true
    })
  }

  updateSearchTerm(e){
    this.setState({
      searchTerm: e.target.value
    });
  }

  renderContent(){
    if(!this.state.searched){
      return <div className="wrapper">
        <Overlayer />
        <div className="headerBox">
          <h1>
            <div className="left">Find</div>
            <div className="right">your</div>
            <div className="center">favourite show</div>
          </h1>
          <div className="searchBarBox">
            <input onChange={this.updateSearchTerm} type="text" placeholder="Type a keyword" /> <button className="btn" onClick={this.getValue}>Szukaj</button>
          </div>
        </div>
      </div>   
    }
    else if(this.state.specifiedSearch === null){
      return <div className="mainContent">
        {this.renderShows()}
      </div>
    }
  }

  async filterOn(){
    let appClass = "";

    await this.setState({
      filteredOn: !this.state.filteredOn
    });

    //Handle disabling scrolling during loading screen
    if(this.state.loading){
      if(this.state.filteredOn){
        appClass = "App noScroll"
      }
      appClass = "App noScroll"
    }
    else{
      if(this.state.filteredOn){
        appClass = "App noScroll"
      }
      else{
        appClass = "App"
      }
    }

    await this.setState({
      appClassName: appClass
    });
  }

  renderShows(){
    let shows = [];
    let id = 0;

    this.state.shows.forEach(vid => {
      shows.push(<MovieBox movie={vid} key={id++}/>)
    });

    return shows;
  }

  async getSpecifiedSearch(show){
    //Change mode to specified search to view show's episodes
    await this.setState({
      specifiedSearch: show,
      searchTerm: show.name
    });

    await this.filterOn();
  }

  async handleBtn(){
    //In movie page after clicking button change searching mode to default one
    await this.setState({
      specifiedSearch: null
    });

    await this.getValue();
  }

  render(){
    return (
    <div className={this.state.appClassName}>
       <Navigation filt={this.filterOn} searchedFlag={this.state.searched} off={this.state.specifiedSearch}/>
       { this.state.searched ? <SearchBarBox search={this.state.searchTerm} get={this.handleBtn} update={this.updateSearchTerm}/> : null}
       {
          this.renderContent()
       }
       {this.state.specifiedSearch !== null ? <MoviePage movie={this.state.specifiedSearch}/> : null}
       {this.state.searched ? <Footer /> : null}
       {this.state.filteredOn ? <Overlayer on={this.state.filteredOn}/> : null}
       {this.state.filteredOn ? <FilterBox get={this.getValue} spec={this.getSpecifiedSearch} update={this.updateSearchTerm} off={this.filterOn}/> : null}
       {this.state.loading ? <LoadingScreen on={this.state.loadingHide}/> : null}
    </div> 
    )
  }
}

export default App;
