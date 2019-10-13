import React from 'react';

import './Playlists.css';

const playlists = ({ playlists }) => {
  const playlistsGallery = playlists.map(playlist => {
    const { id, link, title, picture_medium } = playlist;
    return (
        <div key={id} className="playlist_imageElement">
          <img
            src={picture_medium}
            alt={title}
            className="imageElement__img"
          />
          <div
            className="imageElement__name"
            onClick={() => window.open(link, '_blank')}
            >{title}</div>
        </div>
      );
  });

  return(
    <div className="playlists">
      <h3>Featured Playlists</h3>
      {playlistsGallery}
    </div>
  );
};

export default playlists;
