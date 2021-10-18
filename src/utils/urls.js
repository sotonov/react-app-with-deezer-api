const baseUrl = 'https://api.deezer.com/';
const method = 'search/';
const object = 'artist';
const topArtists = 'top';
const playlists = 'playlists';
const related = 'related';

export const getArtistUrl = artist =>
  `${baseUrl}${method}${object}?q=${artist}&limit=1`;
export const getTopArtistsUrl = ({ id, limit }) =>
  `${baseUrl}${object}/${id}/${topArtists}?limit=${limit}`;
export const getPlaylistsUrl = ({ id, limit }) =>
  `${baseUrl}${object}/${id}/${playlists}?limit=${limit}`;
export const getRelatedUrl = ({ id, limit }) =>
  `${baseUrl}${object}/${id}/${related}?limit=${limit}`;
