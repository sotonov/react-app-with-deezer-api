import React from 'react';

import './Suggestions.css';

const suggestions = (props) => {
  const {suggestions} = props;

  const onClick = (e, name) => {
    props.clicked(name);
  }

  const suggestionsGallery = suggestions.map(suggestion => {
    return (
      <div key={suggestion.id} className="suggestion_imageElement">
        <img
          src={suggestion.picture_medium}
          alt={suggestion.name}
          className="imageElement__img"
        />
        <div
          className="imageElement__name"
          onClick={e => onClick(e, suggestion.name)}
          >{suggestion.name}</div>
      </div>
    )
  })

  return(
    <div className="suggestions">
      <h3>Related Artists</h3>
      {suggestionsGallery}
    </div>
  );
};

export default suggestions;
