import React, { Component } from "react";
import Body from "./components/Body";
import axios from "axios";
import SVG from "./components/SVG";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appRoutes: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://mp-reactversion-default-rtdb.firebaseio.com/appRoutes.json")
      .then((response) => {
        const appRoutes = Object.values(response.data);
        this.setState({ appRoutes, isLoading: false });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loader-wrapper" style={{ animation: "none" }}>
          <SVG></SVG>
        </div>
      );
    }
    return <Body appRoutes={this.state.appRoutes} />;
  }
}

export default App;
