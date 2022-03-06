import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon} from "@fortawesome/free-solid-svg-icons";
import DataFecht from "./DataFecht";
import Portfolio from "./Portfolio";
import Landingpage from "./LandingPage";



const Header = () => {

  function changeVibrantColor(color){
    //document.documentElement.style.setProperty("--main-background-color", "green");
  }
  
  return (
    
    <Router>
    <div>      
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">              
              <Link to="/LandingPage" style={{color: "white", textDecoration: 'none'}}><span className="header-logo" id="header-logo">CRYPTOBROKE</span></Link>             
              <div className="header-links">           
                <div className="header-link-box"><Link to="/DataFecht" style={{color: "white", textDecoration: 'none'}}><span className="header-link">CryptoCurrencies</span></Link></div>             
                <div className="header-link-box"><Link to="/Porfolio" style={{color: "white", textDecoration: 'none'}}><span className="header-link">Portfolio</span></Link></div>  
              </div>            
            </div> 
            <div className="header-right">
              <span className="header-darkmode"><FontAwesomeIcon icon={faMoon} onClick={() => changeVibrantColor("#ff8ba404")}/></span>
            </div>                                  
          </div>
        </div>
      </div>
    </div>

    <Routes>
      <Route path="/DataFecht" element={<DataFecht/>} />
      <Route path="/Porfolio" element={<Portfolio/>} />
      <Route path="/LandingPage" element={<DataFecht/>} />
    </Routes>
    </Router>
    

  );
};

export default Header;
