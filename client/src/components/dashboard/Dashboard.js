import React, { Component } from "react";
import WebMap from '../WebMap/WebMap';
import Navbar from "../layout/Navbar";

class Dashboard extends Component {

  componentDidUpdate(){
    window.onpopstate  = (e) => {
      //your code...
    }
    }
 
render() {
return (
  <div className="Dashboard">
      <Navbar />
      <WebMap />
  </div>
    );
  }
}

export default Dashboard;