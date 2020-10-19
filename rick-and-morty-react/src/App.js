import React, { Component } from 'react';
import CharacterList from "./Components/Characters/CharacterList";
import CharacterScreen from "./Components/Characters/CharacterScreen";
import Locations from "./Components/Locations/Locations";
import Location from "./Components/Locations/Location";
import Episode from "./Components/Episodes/Episode";
import Episodes from "./Components/Episodes/Episodes";
import Dimensions from "./Components/Dimensions/Dimensions";
import Dimension from "./Components/Dimensions/Dimension";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import './App.scss';
import NavBar from './Components/NavBar/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterList: [],
      locations: [],
      episodes: []
    }
  }


  render() {
    return <Router>
      <div className="App">
        <div>
          <NavBar />
        </div>
        <div className="contents">
        <Route exact path="/" component={CharacterList} />
        <Route path="/character/:id" component={CharacterScreen} />

        <div className="container main-content">
          {/* <Route
          exact
          path="/locations"
          render={props => ( <div><Locations /></div>
          )} /> */}
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/episodes" component={Episodes} />
          <Route exact path="/dimensions" component={Dimensions} />
          <Route path="/location/:id" component={Location} />
          <Route path="/episode/:id" component={Episode} />
          <Route path="/dimension/:dimension" component={Dimension} />
        </div>
      </div></div>
    </Router>;
  }
}

export default App;

