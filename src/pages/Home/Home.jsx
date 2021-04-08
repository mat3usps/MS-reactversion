import { Component } from "react";
import Glasses from "../../assets/Utility/Glasses.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPopUp: false,
      email: "",
      password: "",
    };
  }

  showLoginPopUp = (event) => {
    this.setState((prevstate) => ({
      loginPopUp: true,
    }));
  };

  render() {
    return (
      <div className="home">
        {!this.props.userLogged && (
          <div className="row secretBG-row">
            <button
              className="secretBG-button"
              onClick={this.showLoginPopUp}
            ></button>
          </div>
        )}
        {this.state.loginPopUp && (
          <div className="home-popup">
            <div className="login-popup-background"></div>
            <div className="login-popup">
              <form>
                <p id="invitation">Wanna share the view?</p>
                <label for="Email">Email: </label>
                <input
                  className="login-input"
                  value={"email"}
                  id="Email"
                  type="text"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <br />

                <label for="Password">Password: </label>
                <input
                  className="login-input"
                  id="Password"
                  type="password"
                  value={"password"}
                  onChange={(e) => this.setState({ password: e.target.value })}
                ></input>

                <div className="login-button-div">
                  <button
                    type="submit"
                    className="login-button"
                    onClick={"userDidLogin"}
                  >
                    <img className="glasses" src={Glasses} alt="submit" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
