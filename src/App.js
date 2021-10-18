import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
} from 'react-bootstrap';

import './App.css';
import Header from './components/Header/Header';
import Artist from './components/Artist/Artist';
import NoArtist from './components/NoArtist/NoArtist';
import {
  getArtistUrl,
  getPlaylistsUrl,
  getRelatedUrl,
  getTopArtistsUrl,
} from './utils/urls';

class App extends Component {
  state = {
    query: '',
    artist: null,
    tracks: [],
    playlists: [],
    suggestions: [],
    message: '',
  };

  componentDidMount() {
    const query = localStorage.getItem('artist');
    if (query) {
      this.setState({ query }, this.search(query));
    }
  }

  search = artistName => {
    localStorage.removeItem('artist');
    localStorage.setItem('artist', artistName);

    fetch(getArtistUrl(artistName))
      .then(response => response.json())
      .then(json => {
        if (json.total) {
          const [artist] = json.data;

          this.setState({ artist }, () => {
            const { id } = this.state.artist;

            fetch(getTopArtistsUrl({ id, limit: 10 }))
              .then(response => response.json())
              .then(json =>
                json.error
                  ? this.setState({ tracks: [] })
                  : this.setState({ tracks: json.data })
              )
              .catch(() =>
                this.setState({ message: 'danger' }, this.resetArtist)
              );

            fetch(getPlaylistsUrl({ id, limit: 3 }))
              .then(response => response.json())
              .then(json =>
                json.error
                  ? this.setState({ playlists: [] })
                  : this.setState({ playlists: json.data })
              )
              .catch(() =>
                this.setState({ message: 'danger' }, this.resetArtist)
              );

            fetch(getRelatedUrl({ id, limit: 5 }))
              .then(response => response.json())
              .then(json =>
                json.error
                  ? this.setState({ suggestions: [] })
                  : this.setState({ suggestions: json.data })
              )
              .catch(error => {
                this.setState({ message: 'danger' }, this.resetArtist);
              });
          });
        } else {
          this.setState(
            {
              message: 'info',
            },
            this.resetArtist
          );
        }
      })
      .catch(() => this.setState({ message: 'danger' }, this.resetArtist));
  };

  handleArtistChange = (event, name) => {
    this.setState({ query: name, message: '' }, this.search(name));
    setTimeout(() => window.scrollTo(0, 0), 1000);
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      query: value,
      message: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    if (query.length) {
      this.search(query);
    } else {
      this.resetArtist();
    }
  };

  resetArtist = () => {
    this.setState({
      artist: null,
      tracks: [],
      playlists: [],
      suggestions: [],
    });
  };

  render() {
    const { query, artist, playlists, suggestions, tracks, message } =
      this.state;

    const searchInput = (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Find an Artist"
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
              {artist && !message ? (
                <Artist
                  artist={artist}
                  tracks={tracks}
                  playlists={playlists}
                  suggestions={suggestions}
                  handleArtistChange={this.handleArtistChange}
                />
              ) : null}
              {message ? <NoArtist bsStyle={message} query={query} /> : null}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
