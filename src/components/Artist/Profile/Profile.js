import React from 'react';

import './Profile.css';

const profile = ({ artist }) => {
  const { picture_medium, name, link, nb_fan } = artist;
  return (
    <div className="profile">
      <img
        className="profile__img"
        src={picture_medium}
        alt="name"
        onClick={() => window.open(link, '_blank')}
      />
      <div className="profile__info">
        <div className="info__name">{name}</div>
        <div className="info__fans">{nb_fan} fans</div>
      </div>
    </div>
  );
};

export default profile;
