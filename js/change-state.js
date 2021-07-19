import {setDefaultPositionMarker, initSimilarMarkers, defaultPosition} from './map.js';
import {setDefaultValues} from './form.js';

const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const disableForm = (form) => {
  const children = Array.from(form.children);
  form.classList.add('ad-form--disabled');

  children.forEach((item) => {
    children.disabled = true;
  });
};

const enableForm = (form) => {
  const children = Array.from(form.children);
  form.classList.remove('ad-form--disabled');

  children.forEach((item) => {
    children.disabled = false;
  });
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
