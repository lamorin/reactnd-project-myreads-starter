import React, { Component } from 'react'
import ShelfChange from './ShelfChange'

class Book extends Component {
    render() {
        return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
                <ShelfChange></ShelfChange>
            </div>
            <div className="book-title">1776</div>
            <div className="book-authors">David McCullough</div>
        </div>)
    }
}

export default Book

