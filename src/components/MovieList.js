import React from 'react'
import { Link } from "react-router-dom";

const MovieList = (props) => {

    // function handleClick(e) {
    //     console.log('object')
    // }

    const truncateOverview = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }

    return (
        <div>
            <div className="row">
                {props.movies.map((movie, i) => (
                    <div key={i} className='col-lg-4'>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} className="card-img-top" alt="film" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview, 50)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={(e) => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <Link type="button"
                                        className="btn btn-md btn-outline-primary"
                                        to={`edit/${movie.id}`}
                                    >Edit</Link>
                                    <h2><span className="badge badge-info">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MovieList;
