import React, { Component } from 'react';

import './Gallery.css';
import { Glyphicon } from 'react-bootstrap';

class Gallery extends Component {
  state = {
    audio: null,
    playingId: '',
    shownId: '',
  }

  handleClick = (event, id) => {
    const { playingId } = this.state;
    const { tracks } = this.props;
    const track = tracks.find(track => id === track.id);
    const trackUrl = track.preview;
    const audio = new Audio(trackUrl);
    if (!playingId) {
      this.setState({
        playingId: id,
        audio
      }, this.playAudio);
    } else {
      this.stopAudio();
      if (id === playingId) {
        this.setState({
          playingId: ''
        });
      } else {
        this.setState({
          playingId: id,
          audio
         }, this.playAudio)
      }
    }
  }

  playAudio = () => {
    const { audio } = this.state;
    audio.play();
    audio.onended = () => {
      this.setState({
        playingId: '',
      })
    };
  }

  stopAudio = () => {
    const { audio } = this.state;
    audio.pause();
    this.setState({
      playingId: ''
    });
  }

  togglePlayStop = (event, id = '') => {
    this.setState({
      shownId: id
    });
  }

  render () {
    const { tracks } = this.props;
    const { shownId, playingId } = this.state;
    const gallery = tracks.map(track => {
      const { id, album, title, title_short } = track;
      return (
        <div key={id} className="track">
          <div
            onMouseEnter={e => this.togglePlayStop(e, id)}
            onMouseLeave={this.togglePlayStop}
            onClick={e => this.handleClick(e, id)}
            className={id !== shownId ? "track__playStop track__playStop--hidden" : "track__playStop"}>
            {id !== playingId ? <Glyphicon glyph='play'/> : <Glyphicon glyph='stop' />}
          </div>
          <img
            src={album.cover_medium}
            alt={title_short}
            className="track__img"
          />
          <div className="track__name">
            {title}
          </div>
        </div>
      )
    })
    return (
      <div className="gallery">
        <h3 className="gallery__subtitle">Top Songs</h3>
        {gallery}
      </div>
    );
  };
}

export default Gallery;
