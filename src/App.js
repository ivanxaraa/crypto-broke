import './DataFecht.css';
import "./header.css";
import "./Portfolio.css";
import "./Landing.css";
import "./Variables.css";
import React, { useEffect, useState } from "react"

import { BrowserRouter as  Router, Route, Routes, Link} from "react-router-dom";

import Portfolio from './Components/Portfolio'
import DataFecht from './Components/DataFecht';
import Header from './Components/Header';
import Landingpage from './Components/LandingPage';




function App() {    

  return (
    <Header />    
  );
}

export default App;
