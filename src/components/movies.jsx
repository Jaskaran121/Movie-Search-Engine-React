import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../services/utils/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
class Movie extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    movies: [],
    genres: [],
    searchQuery: "",
    selectedGenre: "All Genres",
    sortColumn: {
      sortBy: "title",
      order: "asc"
    }
  };

  async componentDidMount() {
<<<<<<< HEAD
    const get_genres = await getGenres();
    const genres = [{name:"All Genres",_id:0}, ...get_genres];
=======
    const get_Genres = await getGenres();
    const genres = [{ name: "All Genres" }, ...get_Genres];
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
    const get_Movies = await getMovies();
    this.setState({ movies: get_Movies, genres });
  }

<<<<<<< HEAD
  handleDelete = async id => {
    const orginalMovies = this.state.movies;
    const movies = orginalMovies.filter(movie => movie._id !== id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        window.alert("Movie already deleted from the database");
      this.setState({ movies: orginalMovies });
    }
=======
  handleDelete = id => {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleLike = movie => {
<<<<<<< HEAD
    const orginalMovies = this.state.movies;
    let movieIndex = orginalMovies.findIndex(i => i._id === movie._id);

    if (!movie.liked) movie.liked = true;
    else movie.liked = false;

    orginalMovies[movieIndex] = movie;
    this.setState({ movies: orginalMovies });
=======
    if (!movie.liked) movie.liked = true;
    else movie.liked = false;
    this.setState({ movies: getMovies() });
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
  };

  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ currentPage: 1, selectedGenre: genre, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn: { sortBy: sortColumn.sortBy, order: sortColumn.order }
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies,
      sortColumn,
      searchQuery
    } = this.state;
    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else
      filteredMovies =
        selectedGenre && selectedGenre !== "All Genres"
          ? movies.filter(m => m.genre.name === selectedGenre)
          : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.sortBy],
      [sortColumn.order]
    );

    const paginatedData = paginate(sortedMovies, currentPage, pageSize);

    if (this.state.movies.length === 0)
      return <h1>No movie in the database</h1>;

    return (
      <div>
        <div className="row">
          <div className="col-2 m-4">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col-6">
            <Link
              className="btn btn-primary"
              to="movies/new"
              role="button"
              style={{ margin: "2%" }}
            >
              New Movie
            </Link>
            <p>{filteredMovies.length} movies are present in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={paginatedData}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              handleSort={this.handleSort}
            />
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onClick={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
