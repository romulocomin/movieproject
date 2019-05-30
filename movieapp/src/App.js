import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      total_pages: null,
      page_num: 1,
      query: null
    }

    this.mostPopular();
  }
/**
 * Function next page
 */
  nextPage = () => {
   
    if (this.state.movies && this.state.page_num < this.state.total_pages) {
      this.setState({
        page_num: this.state.page_num += 1
      }, () => this.mostPopular(this.state.page_num))
      
    }
  }
/**
 * Function previus page
 */
  previousPage = () => {
    if (this.state.movies && this.state.page_num !== 1) {
     
      this.setState({
        page_num: this.state.page_num -= 1
      }, () => this.mostPopular(this.state.page_num))

    }
  }

  /**
   * 
   * @param {number} page 
   * Request in the api 
   */
  mostPopular(page) {

    const pagesearch = page;
    
    const urlString0 = "https://projapimovie.herokuapp.com/mostpopular/" + pagesearch;
    $.ajax({
      url: urlString0,
      success: (searchResults) => {
        console.log("Fetched data successfully")

        const results = searchResults.results;
      
        var tpages =searchResults.results[0].total_pages;

        this.setState({ total_pages: tpages });

        var movieRows = []

        if(results!=='undefined'){
            results.forEach((movie) => {
             
              movie.poster_src = movie.poster_path
              movie.genre = movie.genre.join().substr(1);
             
              const movieRow = <MovieRow key={movie.id} movie={movie} />
              movieRows.push(movieRow)
            })
          }else{
            console.log("empty or undifined"+ JSON.stringify(searchResults) );
          }   
        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data", xhr);
        console.error("Failed to fetch status", status);
        console.error("Failed to fetch err", err);
      }
    })

  }

  /**
   * 
   * @param {string} searchTerm 
   */
 
  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://projapimovie.herokuapp.com/moviesearch/" + searchTerm;

    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
       
        const results = searchResults.results


        var movieRows = []
        if(results!=='undefined'){
              results.forEach((movie) => 
                {
                movie.poster_src =  movie.poster_path;
                
                              
                const movieRow = <MovieRow key={movie.id} movie={movie} />
               
                movieRows.push(movieRow)
                 })
            }else{
              console.log("empty or undifined"+JSON.stringify(searchResults) );
            }
        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data", xhr);
        console.error("Failed to fetch status", status);
        console.error("Failed to fetch err", err);
      }
    })
  }

  
  /**
   * 
   * @param {event value} event 
   */
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this

    const searchTerm = event.target.value
    if (searchTerm === "") {
      this.mostPopular();
    } else {
      boundObject.performSearch(searchTerm)
    }

  }


  render() {
    return (
      <div>

        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.svg" />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />
        <button onClick={this.previousPage} style={{ marginLeft: "28%" }}>Previous Page</button>
        <button onClick={this.nextPage} style={{ marginLeft: "0%" }}>Next Page >></button>
        {this.state.rows}

      </div>
    );
  }
}

export default App;
