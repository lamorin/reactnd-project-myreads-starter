import React from 'react'
import _ from 'lodash'

// import * as BooksAPI from './BooksAPI'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'
import BookShelf from './components/BookShelf';
import { getAll, update } from './BooksAPI'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {}
    this.state = {books : {}}
    getAll().then((data)=>(this.setState({books: data})))

    this.changeShelfHandler = this.changeShelfHandler.bind(this);
  }

  changeShelfHandler(book, shelf) {
    update(book, shelf).then(()=>getAll().then((data) => this.setState({books: data})))
  }

  render() {
    return (
      <Router>
         <div className="app">
        <Switch>
          <Route path="/search">
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

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
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
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
