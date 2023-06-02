import getRefs from './get-refs';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { URL, fetchBreeds, fetchCatByBreed } from './cat-api';

import 'slim-select/dist/slimselect.css';

const refs = getRefs();
refs.select.style.maxWidth = '360px';
isHidden([refs.select, refs.error, refs.info]);
isVisually([refs.loader]);

const slimSelect = new SlimSelect({
  select: refs.select,
  settings: {
    placeholderText: 'Choose the breed of the cat',
    allowDeselect: true,
    maxSelected: 1,
  },
});

let distResource = 'breeds';
let url = URL + distResource;

fetchBreeds(url).then(addDataSelectBreeds).catch(isError);

function addDataSelectBreeds(arrBreeds) {
  if (!arrBreeds || arrBreeds.length === 0) {
    isHidden([refs.loader]);
    isVisually([refs.error]);
    Notify.failure(refs.error.textContent);
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

  isHidden([refs.loader, refs.error, refs.info]);
  isVisually([refs.select]);
}

refs.select.addEventListener('change', onSelectBreed);

function onSelectBreed(e) {
  if (e.target.value === '') {
    return;
  }
  distResource = `images/search?breed_ids=${e.target.value}&limit=3&size=full`;
  url = URL + distResource;
  isHidden([refs.info]);
  isVisually([refs.loader]);
  fetchCatByBreed(url).then(addMarkupInfo).catch(isError);
}

function addMarkupInfo(arrInfo) {
  if (!arrInfo || arrInfo.length === 0) {
    isHidden([refs.loader, refs.info]);
    isVisually([refs.error]);
    Notify.failure(refs.error.textContent);
    return;
  }
  const markUp =
    arrInfo
      .map(
        ({ url, breeds }) =>
          `<img
             src="${url}"
             alt="${breeds[0].alt_names || breeds[0].name || 'cat image'}"
             width="300"
             height="300"
          />`
      )
      .join('') +
    `<div class="info">
            <h1 class="ihfo-title">${arrInfo[0].breeds[0].name}</h1>
            <p class="info-description">${arrInfo[0].breeds[0].description}</p>
            <p class="info-description">Country of Origin: ${arrInfo[0].breeds[0].origin}</p>
            <p class="info-description">Temperament: ${arrInfo[0].breeds[0].temperament}</p>
     </div>`;
  refs.info.innerHTML = markUp;
  isHidden([refs.loader]);
  isVisually([refs.info]);
}

function isVisually(arrEl) {
  arrEl.forEach(el => {
    if (el.classList.contains('visually-hidden')) {
      el.classList.remove('visually-hidden');
    }
  });
}

function isHidden(arrEl) {
  arrEl.forEach(el => {
    if (!el.classList.contains('visually-hidden')) {
      el.classList.add('visually-hidden');
    }
  });
}

function isError(error) {
  isHidden([refs.info, refs.loader, refs.select]);
  isVisually([refs.error]);
  Notify.failure(refs.error.textContent);
  console.error('Error status: ', error);
}
