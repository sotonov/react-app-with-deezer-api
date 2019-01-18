import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Gallery from './containers/Gallery/Gallery';
import Playlists from './components/Playlists/Playlists';
import Suggestions from './components/Suggestions/Suggestions';

class App extends Component {
  state = {
    query: '',
    id: '',
    artist: null,
    tracks: [],
    playlists: [],
    suggestions: []
  }

  componentDidMount(){
    const query = localStorage.getItem('artist');
    this.setState({query}, this.search(query));
  }

  search = (artistName) => {
    localStorage.removeItem('artist');
    localStorage.setItem('artist', artistName);

    const BASE_URL = 'https://api.deezer.com/';
    let method = 'search/';
    let object = 'artist';
    fetch(`${BASE_URL}${method}${object}?q=${artistName}`)
      .then(response => response.json())
      .then(json => {
        const artist = json.data[0];
        const id = artist.id;

        this.setState({artist, id}, () => {
          fetch(`${BASE_URL}${object}/${this.state.id}/top?limit=10`)
            .then(response => response.json())
            .then(json => this.setState({ tracks: json.data }))


          fetch(`${BASE_URL}${object}/${this.state.id}/playlists?limit=3`)
            .then(response => response.json())
            .then(json => json.error ? null : this.setState({playlists: json.data}))
            .catch(error => console.log(error))


          fetch(`${BASE_URL}${object}/${this.state.id}/related?limit=5`)
            .then(response => response.json())
            .then(json => this.setState({suggestions: json.data}));
        });
      });
  }

  handleArtistChange = (name) => {
    this.setState({ query: name }, this.search(name));
    setTimeout(() => window.scrollTo(0, 0), 2000);
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.search(this.state.query);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.search(this.myQuery.props.value);
    }
  }

  render() {
    let profile, gallery, playlists, suggestions, searchInput;

    if (this.state.artist) {
      profile = <Profile artist={this.state.artist} />;
      if (this.state.tracks.length) {
        gallery = <Gallery tracks={this.state.tracks} />;
      }
      if (this.state.playlists.length) {
        playlists = <Playlists playlists={this.state.playlists} />
      }
      if (this.state.playlists.length) {
        suggestions = <Suggestions
          suggestions={this.state.suggestions}
          handleClick={(event, name) => this.handleArtistChange(name)}/>
      }
    }

    searchInput = (
      <Form>
        <FormGroup>
          <InputGroup>
            <FormControl
              ref={input => this.myQuery = input}
              type="text"
              placeholder="Add an Artist"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.query}
            />
            <InputGroup.Addon>
              <Glyphicon
                glyph='search'
                onClick={this.handleClick}
              />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </Form>
    )
    return (
      <div className="app">
        <Header />
        <Grid>
          <Row>
            <Col xs={0} sm={0} md={1} lg={2}>

            </Col>
            <Col xs={12} sm={12} md={10} lg={8} >
              {searchInput}
              {profile}
              {gallery}
              {playlists}
              {suggestions}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
