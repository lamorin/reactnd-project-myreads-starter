import React from 'react'
import Book from './Book'
import _ from 'lodash'

function SearchResults(props) {
    const { changeShelfHandler, books } = props
    return (
        <div className="bookshelf-books">
        <ol className="books-grid">
                {   _.values(books).map(
                    (book) =>
                    <li key={book.id + 'li'}>
                    <Book key={book.id} shelf={book.shelf} changeShelfHandler={changeShelfHandler} book={book}>
                    </Book>
                    </li>)
                }
            </ol>
        </div>
    )

}

export default SearchResults