const URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
export { URL, fetchBreeds };
