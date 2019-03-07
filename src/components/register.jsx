import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
import {registerUser} from "../services/userService";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("UserName"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .min(3)
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try{
      const jwt = await registerUser(this.state.data);
      localStorage.setItem('token',jwt.data);
      window.location = "/";
    }
    catch(ex){
      if(ex.response && ex.response.status === 400)
      window.alert("User Already Exists");  
    }
  };

  render() {
    return (
      <div style={{ padding: "35px 200px 200px" }}>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
