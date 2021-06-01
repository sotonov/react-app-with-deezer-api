const baseUrl = 'https://api.deezer.com/';
const method = 'search/';
const object = 'artist';
const topArtists = 'top?limit=10';
const playlists = 'playlists?limit=3';
const related = 'related?limit=5';

export const getArtistUrl = artist => `${baseUrl}${method}${object}?q=${artist}`;
export const getTopArtistsUrl = id => `${baseUrl}${object}/${id}/${topArtists}`;
export const getPlaylistsUrl = id => `${baseUrl}${object}/${id}/${playlists}`;
export const getRelatedUrl = id => `${baseUrl}${object}/${id}/${related}`;