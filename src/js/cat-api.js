const URL = 'https://api.thecatapi.com/v1/';

const options = {
  headers: {
    'x-api-key':
      'live_uMkV2UWWcmM6hm1Y3LqJNWLfHTUhWo4CLMVL2RKfu1dNLV80x42vRzEj0aWZnk6l',
  },
};

function fetchBreeds(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(url) {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export { URL, options, fetchBreeds, fetchCatByBreed };
