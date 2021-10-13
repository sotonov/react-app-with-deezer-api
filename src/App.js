import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import {
  Alert,
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
} from "react-bootstrap";

import "./App.css";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Gallery from "./containers/Gallery/Gallery";
import Playlists from "./components/Playlists/Playlists";
import Suggestions from "./components/Suggestions/Suggestions";
import {
  getArtistUrl,
  getPlaylistsUrl,
  getRelatedUrl,
  getTopArtistsUrl,
} from "./utils/urls";

class App extends Component {
  state = {
    query: "",
    id: "",
    artist: null,
    tracksArray: [],
    playlistsArray: [],
    suggestionsArray: [],
    error: false,
  };

  componentDidMount(){
    const query = localStorage.getItem('artist');
    this.setState({ query }, this.search(query));
  }

  search = (artistName) => {
    localStorage.removeItem("artist");
    localStorage.setItem("artist", artistName);

    fetch(getArtistUrl(artistName))
      .then((response) => response.json())
      .then((json) => {
        if (json.total) {
          const artist = json.data[0];
          const { id } = artist;

          this.setState({ artist, id }, () => {
            const { id } = this.state;
            fetch(getTopArtistsUrl(id))
              .then((response) => response.json())
              .then((json) => this.setState({ tracksArray: json.data }));

            fetch(getPlaylistsUrl(id))
              .then((response) => response.json())
              .then((json) =>
                json.error ? null : this.setState({ playlistsArray: json.data })
              )
              .catch((error) => this.setState(error));

            fetch(getRelatedUrl(id))
              .then((response) => response.json())
              .then((json) => this.setState({ suggestionsArray: json.data }));
          });
        } else {
          console.log("here");
          this.setState({ error: true, artist: null });
        }
      });
  };

  handleArtistChange = (name) => {
    this.setState({ query: name }, this.search(name));
    setTimeout(() => window.scrollTo(0, 0), 2000);
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      query: value,
      error: false,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.search(query);
  }

  render() {
    const {
      artist,
      playlistsArray,
      query,
      suggestionsArray,
      tracksArray,
      error,
    } = this.state;
    let profile, gallery, playlists, suggestions, searchInput, info;

    if (artist) {
      profile = <Profile artist={artist} />;
      if (tracksArray.length) {
        gallery = <Gallery tracks={tracksArray} />;
      }
      if (playlistsArray.length) {
        playlists = <Playlists playlists={playlistsArray} />;
      }
      if (suggestionsArray.length) {
        suggestions = (
          <Suggestions
            suggestions={suggestionsArray}
            handleClick={(e, name) => this.handleArtistChange(name)}
          />
        );
      }
    } else if (error) {
      info = (
        <Alert bsStyle="info">
          {`There is no data for ${query}. Search for something else...`}
        </Alert>
      );
    }

    searchInput = (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Add an Artist"
              onChange={this.handleChange}
              value={query}
            />
            <InputGroup.Addon>
              <Glyphicon
                bsClass="glyphicon"
                glyph="search"
                onClick={this.handleSubmit}
              />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
    return (
      <div className="app">
        <Header />
        <Grid>
          <Row>
            <Col xs={0} sm={0} md={1} lg={2} />
            <Col xs={12} sm={12} md={10} lg={8}>
              {searchInput}
              {profile}
              {gallery}
              {playlists}
              {suggestions}
              {info}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
