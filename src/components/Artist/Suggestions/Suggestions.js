import React from 'react';

import './Suggestions.css';

const suggestions = ({ suggestions, handleClick }) => {
  const suggestionsGallery = suggestions.map(suggestion => {
    const { id, name, picture_medium: picture } = suggestion;
    return (
      <div key={id} className="suggestion_imageElement">
        <img src={picture} alt={name} className="imageElement__img" />
        <div className="imageElement__name" onClick={e => handleClick(e, name)}>
          {name}
        </div>
      </div>
    );
  });

  return (
    <div className="suggestions">
      <h3>Related Artists</h3>
      {suggestionsGallery}
    </div>
  );
};

export default suggestions;
