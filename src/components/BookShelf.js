import React from 'react'
import Book from './Book'
import _ from 'lodash'

function BookShelf(props) {
    const { shelf, changeShelfHandler, books } = props
    return (
        <div className="bookshelf-books">
        <ol className="books-grid">
                {   _.values(books).map(
                    (book) =>
                    <li key={book.id + 'li'}>
                    <Book  shelf={shelf} changeShelfHandler={changeShelfHandler} book={book}>
                    </Book>
                    </li>)
                }
            </ol>
        </div>
    )

}

export default BookShelf