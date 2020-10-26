import React from "react";
import SearchBar from './SearchBar'
import MovieList from './MovieList'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'
import axios from "axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }
    // async componentDidMount() {
    //     const baseURL = "http://localhost:3002/movies";
    //     const response = await fetch(baseURL)
    //     const data = await response.json();
    //     this.setState({ movies: data })
    // }

    async componentDidMount() {
        this.getMovies();
    }
    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({ movies: response.data })

    }
    //Fetch Api

    /* deleteMovie = async (movie) => {
         const baseURL = `http://localhost:3002/movies/${movie.id}`;
         await fetch(baseURL, {
             method: "DELETE"
         })
         const newMovielist = this.state.movies.filter(
             m => m.id !== movie.id
         );
         // this.setState({
         //     movies: newMovielist
         // })
         this.setState(state => ({
             movies: newMovielist
         }))
     }*/

    //AXIOS

    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`);

        const newMovielist = this.state.movies.filter(
            m => m.id !== movie.id
        );
        // this.setState({
        //     movies: newMovielist
        // })
        this.setState(state => ({
            movies: newMovielist
        }))
    }

    // deleteMovie = (movie) => {
    //     const newMovielist = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );
    //     // this.setState({
    //     //     movies: newMovielist
    //     // })
    //     this.setState(state => ({
    //         movies: newMovielist
    //     }))
    // }
    //SEARCH MOVIE
    searchMovie = (e) => {
        this.setState({ searchQuery: e.target.value })
    }

    //AdD MOVIE
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/ `, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
    }

    //Edit MOVIE∑
    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id} `, updatedMovie)
        this.getMovies();
    }

    render() {
        let filteredMovies = this.state.movies.filter(
            (movie) => movie.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            // return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        })
        return (
            <Router>
                <div className='container'>
                    <Switch>
                        <Route path="/" exact render={() => (
                            <>
                                <div className='row'>
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie} />
                                    </div>
                                </div>

                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovieProp={this.deleteMovie} />
                            </>
                        )}>
                        </Route>
                        <Route path="/add" render={({ history }) => (
                            <>
                                <AddMovie
                                    onAddMovie={(movie) => {
                                        this.addMovie(movie)
                                        history.push("/")
                                    }
                                    }

                                />

                            </>
                        )}>
                        </Route>

                        <Route path="/edit/:id" render={(props) => (
                            <>
                                <EditMovie
                                    {...props}
                                    onEditMovie={(id, movie) => {
                                        this.editMovie(id, movie)

                                    }
                                    }

                                />

                            </>
                        )}>
                        </Route>



                    </Switch>
                </div>
            </Router >
        )
    }


}

export default App;


// {
//     "name": "Hostage",
//     "rating": "6.3",
//     "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4hne3v6jN4MlCnhSkxOW7YspJhr.jpg",
//     "overview": "When a mafia accountant is taken hostage on his beat, a police officer – wracked by guilt from a prior stint as a negotiator – must negotiate the standoff, even as his own family is held captive by the mob.",
//     "id": 5
// }

/*{
    "movies": [
        {
            "name": "The Matrix 3",
            "rating": "8.1",
            "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
            "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
            "id": 1
        },
        {
            "name": "The Matrix Reloaded",
            "rating": "6.9",
            "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jBegA6V243J6HUnpcOILsRvBnGb.jpg",
            "overview": "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance. Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition.",
            "id": 2
        },
        {
            "name": "Saw 3D",
            "rating": "7.5",
            "overview": "SAW legacy, a group of Jigsaw survivors gathers to seek the support of self-help guru and fellow survivor Bobby Dagen, a man whose own dark secrets unleash a new wave of terror.",
            "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qHCZ6LjtmqWDfXXN28TlIC9OppK.jpg",
            "id": 3
        },
        {
            "name": "Blitz 007",
            "rating": "11",
            "overview": "A tough, renegade cop with a gay sidekick is dispatched to take down a serial killer who has been targeting police officers. AÇIKLAMA AÇIKLAMA",
            "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qCPMjT8Ld8tvs1zs7LY2jpKlRIK.jpg",
            "id": 4
        }
    ]
}*/