import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { login } from "../services/authService";
import {Redirect} from "react-router-dom";
class Login extends Form {
  state = {
    data: { username: "", password: "",jwt:""},
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("UserName"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  componentDidMount(){

  }

  doSubmit = async() => {
    try{
      const { data } = this.state;
      await login(data.username,data.password);
      const{ state } = this.props.location;
      //console.log(state.from.pathname);
      //window.location = '/movies/new';
      // window.location = state ? state.from.pathname : '/';
      window.location ='/';
    }
    catch(ex)
    {
      if(ex.response && ex.response.status ===400)
      {
        window.alert("Invalid Credentials");
      }
    }
  };

  render() {
    if(localStorage.getItem('token')) return <Redirect to ='/movies'/>;
    return (
      <div style={{ padding: "35px 200px 200px" }}>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
