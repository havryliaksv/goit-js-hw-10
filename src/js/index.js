import getRefs from './get-refs';
import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';

import 'slim-select/dist/slimselect.css';

const URL = 'https://api.thecatapi.com/v1/';

const refs = getRefs();
refs.select.style.width = '40%';

const slimSelect = new SlimSelect({
  select: refs.select,
  settings: {
    placeholderText: 'Choose the breed of the cat',
    allowDeselect: true,
  },
});

let distResource = 'breeds';
let url = URL + distResource;

fetchBreeds(url)
  .then(addDataSelect)
  .catch(error => console.log(error));

function addDataSelect(arrBreeds) {
  if (arrBreeds.length === 0) {
    return;
  }
  const dataSelect = arrBreeds.map(breed => {
    return { text: breed.name, value: breed.id };
  });
  slimSelect.setData(dataSelect);
}
