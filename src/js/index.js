import getRefs from './get-refs';
import SlimSelect from 'slim-select';
import { URL, fetchBreeds } from './cat-api';

import 'slim-select/dist/slimselect.css';

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
  .then(addDataSelectBreeds)
  .catch(error => console.log(error));

function addDataSelectBreeds(arrBreeds) {
  if (arrBreeds.length === 0) {
    return;
  }
  const dataSelectBreeds = arrBreeds.map(({ name, id }) => {
    return { text: name, value: id };
  });
  const firstOption = [
    {
      text: '',
      placeholder: true,
    },
  ];
  const allOptions = [...firstOption, ...dataSelectBreeds];
  slimSelect.setData(allOptions);
}

refs.select.addEventListener('change', onSelectBreed);

function onSelectBreed(e) {
  if (e.target.value === '') {
    return;
  }
  console.log('chahge breed: ', e.target.value);
}
