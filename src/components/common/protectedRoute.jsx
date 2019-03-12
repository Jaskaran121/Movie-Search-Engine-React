import React, { Component } from 'react';
import {Route,Redirect} from "react-router-dom";

const ProtectedRoute = ({ path,component:Component,user,render}) => {
    return (
    <Route 
    path = {path}
    render ={props => {
      if(!user)
      return <Redirect to = {{
          pathname :"/login",
          state:{from:props.location}
      }}></Redirect>
      else
      return Component?<Component {...props}></Component>: render(props)
    }}/> );
}
 
export default ProtectedRoute;