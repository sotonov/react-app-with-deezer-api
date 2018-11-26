import React from 'react';

import './Profile.css'

const profile = (props) => {
  const {artist} = props;
  return (
    <div className="profile">
      <img
        className="profile__img"
        src={artist.picture_medium}
        alt='Profile Pic'
      />
      <div className="profile__info">
        <div className="info__name">{artist.name}</div>
        <div className="info__fans">{artist.nb_fan} fans</div>
      </div>
    </div>
  );
};

export default profile;
