import React from 'react';
import './App.css';

class MoviePage extends React.Component{
  constructor(){
    super();
    this.state = {
        seasons: [],
        episodes: [],
        listsElements: []
    };

  } 

  componentDidMount(){
    this.getSeasons();
  }

  async getSeasons(){
    let data = await fetch(`http://api.tvmaze.com/shows/${this.props.movie.id}/seasons`);
    let fetched = await data.json();
    let localEpisodesArr = [];

    await fetched.forEach(async season => {
        let episodes = await fetch(`http://api.tvmaze.com/seasons/${season.id}/episodes`);
        let episodesFetched = await episodes.json();

        await localEpisodesArr.push(episodesFetched);
        await this.setState({
            episodes: localEpisodesArr,
            seasons: fetched,
        });

        await this.generateBoxList();
    });
  }

  async generateBoxList(){
    let box = [];
    await box.push(
        <div className="listBox">
            {this.generateList()}
        </div>
    );

    await this.setState({
        listsElements: box
    });

  }

  generateList(){
    if (this.state.seasons.length !== 0 && this.state.episodes.length !== 0) {
        let listBox = [];
        //Generate each column representing one season
        for(let i = 0; i < this.state.seasons.length; i++){
            listBox.push(
                <ul>
                    {
                        this.generateListElement(i)
                    }
                </ul>
            )
        }

        return listBox;
    }
  }

  generateListElement(id){
    let listElements = [];

    if(this.state.seasons.length === this.state.episodes.length){
        //Render episodes names
        for(let j = 0; j < this.state.episodes[id].length; j++){
            if(j === 0){
                listElements.push(<li>Season {id + 1}</li>)
            }
            else{
                listElements.push(<li>{this.state.episodes[id][j].name}</li>)
            }
        }
    }
 
    return listElements;
  }

  determineClassName(){
    //Handle how to view page depending on how many seasons show has and screen width
    if(this.state.seasons.length > 3 || window.screen.width <= 1024){
      return "moviePage moreSeasons"
    }
    else{
      return "moviePage"
    }
  }

  render(){
    return (
    <div className={this.determineClassName()}>
      <div className="movieImg">
          <img src={this.props.movie.image.original} alt="Show's poster"/>
      </div>
      <div className="movieSpecInfo">
        <div className="specificInfo">
            {this.state.listsElements}
        </div>
      </div>
    </div> 
    )
  }
}

export default MoviePage;
