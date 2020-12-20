import React from 'react'
import Book from './Book'
import _ from 'lodash'

function SearchResults(props) {
    const { changeShelfHandler, books } = props
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.error !== undefined && <div>No books were found</div>}

                {books.error === undefined &&
                    _.values(books).map(book => {
                        return (
                            <li key={book.id}>
                                <Book
                                    key={book.id}
                                    shelf={
                                        book.shelf !== undefined
                                            ? book.shelf
                                            : 'none'
                                    }
                                    changeShelfHandler={changeShelfHandler}
                                    book={book}
                                />
                            </li>
                        )
                    })}
            </ol>
        </div>
    )
}

export default SearchResults
