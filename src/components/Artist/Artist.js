import React from 'react';

import Profile from './Profile/Profile';
import Gallery from '../../containers/Gallery/Gallery';
import Playlists from './Playlists/Playlists';
import Suggestions from './Suggestions/Suggestions';

const Artist = ({
  artist,
  tracks,
  playlists,
  suggestions,
  handleArtistChange,
}) => {
  return (
    <>
      <Profile artist={artist} />
      {tracks.length ? <Gallery tracks={tracks} /> : null}
      {playlists.length ? <Playlists playlists={playlists} /> : null}
      {suggestions.length ? (
        <Suggestions
          suggestions={suggestions}
          handleClick={handleArtistChange}
        />
      ) : null}
    </>
  );
};

export default Artist;
