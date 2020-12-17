import React from 'react'

function Book(props) {
    const { shelf, book, changeShelfHandler } = props
    let thumbnail = book.imageLinks !== undefined ? book.imageLinks.thumbnail : ""
    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
                <select value={shelf} onChange={(e)=>(changeShelfHandler(book, e.target.value))}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors !== undefined && book.authors.join(', ')}</div>
        </div>
    )
}

export default Book

