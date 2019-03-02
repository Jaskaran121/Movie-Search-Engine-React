import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
<<<<<<< HEAD
import { getGenres } from "../services/genreService";
import {getMovie,saveMovie} from "./../services/movieService";
class MovieForm extends Form {
  state = {
    data: {
      _id:"",
=======
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
class MovieForm extends Form {
  state = {
    data: {
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

<<<<<<< HEAD
  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
    //const movieId = this.props.match.params.id;
    //if(movieId === "new") return;
    //const {data :movie} = await getMovie(movieId);
    //if (!movie) return this.props.history.replace("/not-found");
    //this.setState({ data: this.mapToViewModel(movie.success) });
  }

  mapToViewModel(movie) {
    return {
      _id:movie._id,
=======
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    console.log(movieId);
    // if (movieId === "new") return;
    const movie = getMovie(movieId);
    // if (!movie) return this.props.history.replace("/not-found");

    //this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
<<<<<<< HEAD

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5)
=======
  schema = {
    _id: Joi.string(),
    title: Joi.string()
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .integer()
      .min(1)
      .required()
      .label("Rate")
  };
<<<<<<< HEAD

  doSubmit = async () => {

    await saveMovie(this.state.data);
=======
  doSubmit = () => {
    console.log(this.state.data.dailyRentalRate);
    saveMovie(this.state.data);
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
    this.props.history.push("/movies");
  };

  render() {
<<<<<<< HEAD
    return (
      <div style={{ padding: "35px 200px 200px" }}>
        <h2>Movie</h2>
=======
    const { genres } = this.state;
    return (
      <div style={{ padding: "35px 200px 200px" }}>
        <h2>New Movie</h2>
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "DailyRentalRate", "number")}
          {this.renderButton("Create")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
