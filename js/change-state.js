import {setDefaultPositionMarker, initSimilarMarkers, defaultPosition} from './map.js';
import {setDefaultValues} from './form.js';

const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const disableForm = (form) => {
  const children = form.children;
  form.classList.add('ad-form--disabled');

  for (let index = 0; index < children.length; index++) {
    children[index].disabled = true;
  }
};

const enableForm = (form) => {
  const children = form.children;
  form.classList.remove('ad-form--disabled');

  for (let index = 0; index < children.length; index++) {
    children[index].disabled = false;
  }
};

const addInactiveState = () => {
  disableForm(adForm);
  disableForm(filters);
};

const addActiveState = () => {
  enableForm(adForm);
  enableForm(filters);
};

const setDefaultState = (advertisements) => {
  adForm.reset();
  filters.reset();
  setDefaultPositionMarker();
  setDefaultValues(`${defaultPosition.lat}, ${defaultPosition.lng}`);
  initSimilarMarkers(advertisements);
};

export {addInactiveState, addActiveState, setDefaultState};
