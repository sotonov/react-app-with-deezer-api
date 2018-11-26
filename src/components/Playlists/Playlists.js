import React from 'react';

import './Playlists.css';

const playlists = (props) => {
  const {playlists} = props;
  const playlistsGallery = playlists.map(playlist => {

    return (
        <div key={playlist.id} className="playlist_imageElement">
          <img
            src={playlist.picture_medium}
            alt={playlist.title}
            className="imageElement__img"
          />
          <div
            className="imageElement__name"
            onClick={() => window.open(playlist.link, '_blank')}
            >{playlist.title}</div>
        </div>
      )
  })

  return(
    <div className="playlists">
      <h3>Featured Playlists</h3>
      {playlistsGallery}
    </div>
  );
};

export default playlists;
