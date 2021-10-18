import React from 'react';
import { Alert } from 'react-bootstrap';

const NoArtist = ({ query, bsStyle }) => {
  if (bsStyle === 'danger') {
    return (
      <Alert bsStyle="danger">
        {`An error has occurred. Please try letter...`}
      </Alert>
    );
  }

  return (
    <Alert bsStyle="info">
      {`There is no data for ${query}. Search for something else...`}
    </Alert>
  );
};

export default NoArtist;
