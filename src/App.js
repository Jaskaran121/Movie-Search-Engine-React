import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/common/navbar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import NotFound from "./components/common/notFound";
import Login from "./components/login";
import Register from "./components/register";
import ProtectedRoute from "../src/components/common/protectedRoute";
import MovieForm from "./components/movieForm";
import MovieDetails from "./components/movieDetails";
import jwtDecode from "jwt-decode";
import Logout from "./components/logout";
class App extends Component {
  state = { };

  componentDidMount(){
    try{
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({user});
    }
    catch{
    } 
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user = {this.state.user}/>
        <div className="content">
          <Switch>
            <ProtectedRoute path="/movies/new" component = {MovieForm} user={this.state.user}></ProtectedRoute>
            <Route path="/movies/:id" component={MovieDetails} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies" exact 
            render = {props => <Movies {...props} user = {this.state.user}/>} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
