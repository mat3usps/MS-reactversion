import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

class Markdown extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: null };
  }

  componentDidMount() {
    axios({
      url: this.props.children,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      //const url = window.URL.createObjectURL(new Blob([response.data]))
      this.setState({ terms: response.data });
    });
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown source={this.state.terms} />
      </div>
    );
  }
}

export default Markdown;
