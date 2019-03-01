import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import {getMovie,saveMovie} from "./../services/movieService";
class MovieForm extends Form {
  state = {
    data: {
      _id:"",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

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
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5)
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

  doSubmit = async () => {

    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div style={{ padding: "35px 200px 200px" }}>
        <h2>Movie</h2>
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
