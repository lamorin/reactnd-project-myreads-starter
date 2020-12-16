import React from 'react'
import _ from 'lodash'

// import * as BooksAPI from './BooksAPI'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
import BookShelf from './components/BookShelf';
import { getAll, update } from './BooksAPI'
import SearchResults from './components/SearchResults';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {}
    this.state = {books : {}, search : [], searchText: ""}
    getAll().then((data)=>(this.setState({books: data})))

    this.changeShelfHandler = this.changeShelfHandler.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  changeShelfHandler(book, shelf) {
    console.log('changeShelf')
    update(book, shelf).then(()=>getAll().then((data) => this.setState({books: data})))
  }

  searchChangeHandler(e) {
    console.log(e.target.value)
    this.setState({searchText: e.target.value.toLowerCase()})
    this.state.searchText.length <= 3 && this.setState({search: []})
    this.state.searchText.length > 3 && this.setState({search: _.uniq([...this.state.books.filter((book)=>{
        return book.title.toLowerCase().indexOf(e.target.value.toLowerCase())> -1
    }), ...this.state.books.filter((book)=>{ return book.authors.join(' ').toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 })] )})
  }

  updateSearch(book, shelf) {
    update(book, shelf).then(()=>getAll().then((data) => this.setState({books: data}))).then(
      ()=>(this.setState({search: _.uniq([...this.state.books.filter((book)=>book.title.toLowerCase().indexOf(this.state.searchText.toLowerCase())> -1), ...this.state.books.filter((book)=>{ return book.authors.join(' ').toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 })] )}))
    )
  }

  render() {
    return (
      <Router>
         <div className="app">
        <Switch>
          <Route path="/search">
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>


              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.searchChangeHandler}/>
                <SearchResults  books={ this.state.search } changeShelfHandler={this.updateSearch}></SearchResults>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          </Route>
          <Route path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                   <BookShelf shelf={'currentlyReading'} books={ _.values(this.state.books).filter((book)=>
                    (book.shelf === 'currentlyReading'))} changeShelfHandler={this.changeShelfHandler}></BookShelf>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                   <BookShelf shelf={'wantToRead'} books={ _.values(this.state.books).filter((book)=>
                    (book.shelf === 'wantToRead'))} changeShelfHandler={this.changeShelfHandler}></BookShelf>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf shelf={'read'} books={ _.values(this.state.books).filter((book)=>
                    (book.shelf === 'read'))} changeShelfHandler={this.changeShelfHandler}></BookShelf>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button onClick={() => this.setState({ search: [] })}>Add a book</button></Link>
            </div>
          </div>
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
