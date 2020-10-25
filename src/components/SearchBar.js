import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class SearchBar extends Component {

    state = {
        searchQuery: ""
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className="mt-5">
                <label htmlFor="exampleInputEmail1">Search Movie</label>
                <div className="form-row mb-5">
                    <div className="col-10">
                        <input
                            onChange={this.props.searchMovieProp}
                            type="text" className="form-control"

                            placeholder="Search a movie" />
                    </div>
                    <div className="col-2">
                        <Link
                            to="/add"
                            type="button"
                            className="btn btn-md btn-danger"
                            style={{ float: 'right' }}
                        > Add Movie</Link>
                    </div>
                </div>
            </form>
        )
    }
}
