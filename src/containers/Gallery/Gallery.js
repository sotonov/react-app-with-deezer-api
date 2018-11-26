import React, { Component } from 'react';

import './Gallery.css';
import { Glyphicon } from 'react-bootstrap';

class Gallery extends Component {
  state = {
    url: '',
    audio: null,
    playing: new Array(this.props.tracks.length).fill(false),
    hidden: new Array(this.props.tracks.length).fill(true)
  }

  playStopHandler = (url, play, i) => {
    let updatedPlaying = [...this.state.playing];
    const audio = new Audio(url);
    if (!this.state.url) {
      updatedPlaying[i] = !updatedPlaying[i];
      this.setState({
        playing: updatedPlaying,
        url,
        audio
      }, () => this.playAudio(i));
    } else {
      this.stopAudio();
      if (!play) {
        updatedPlaying[updatedPlaying.indexOf(true)] = false;
        this.setState({ playing: updatedPlaying });
      } else if (url !== this.state.url) {
        [updatedPlaying[updatedPlaying.indexOf(true)], updatedPlaying[i]] = [false, true];
        this.setState({ playing: updatedPlaying });
        this.setState({ url, audio }, () => this.playAudio(i));
      } else {
        updatedPlaying[i] = true;
        this.setState({ playing: updatedPlaying });
        this.setState({ url, audio }, () => this.playAudio(i));
      }
    }
  }

  playAudio = (i) => {
    const audio = this.state.audio;
    audio.play();
    audio.onended = () => {
      let updatedPlaying = [...this.state.playing];
      updatedPlaying[i] = !updatedPlaying[i];
      this.setState({
        playing: updatedPlaying,
        url: ''
      })
    };
  }

  stopAudio = () => {
    this.state.audio.pause();
  }

  clickHandler = (event, i) => {
    event.preventDefault();
    this.playStopHandler(this.props.data[i].preview, !this.state.playing[i], i)
  }

  showPlayStop = (event, i) => {
    event.preventDefault();
    let updatedHidden = [...this.state.hidden];
    updatedHidden[i] = false;
    this.setState({ hidden: updatedHidden });
  }

  hidePlayStop = (event, i) => {
    let updatedHidden = [...this.state.hidden];
    updatedHidden[i] = true;
    this.setState({hidden: updatedHidden});
  }

  render () {
    const {tracks} = this.props;
    const gallery = tracks.map((track, i) => {
      return (
        <div key={track.id} className="track">
          <div
            onMouseEnter={e => this.showPlayStop(e, i)}
            onMouseLeave={e => this.hidePlayStop(e, i)}
            onClick={e => this.clickHandler(e, i)}
            className={this.state.hidden[i] ? "track__playStop track__playStop--hidden" : "track__playStop"}>
            {!this.state.playing[i] ? <Glyphicon glyph='play'/> : <Glyphicon glyph='stop' />}
          </div>
          <img
            src={track.album.cover_medium}
            alt={track.title_short}
            className={"track__img"}
          />
          <div className={"track__name"}>{track.title}</div>
        </div>
      )
    })
    return (
      <div className={"gallery"}>
        <h3 className={"gallery__subtitle"}>Top Songs</h3>
        {gallery}
      </div>
    );
  };
}

export default Gallery;
