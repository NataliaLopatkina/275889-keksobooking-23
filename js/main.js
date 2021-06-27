import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {showErrorMsg, showSuccessMsg, initMessages} from "./message.js";
import {initMap, getMarker} from './map.js';
import './form.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;

const fieldAddress = document.querySelector('#address');
const submitBtn = document.querySelector('.ad-form__submit');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.ad-form__reset');

addInactiveState();
initMap(addActiveState, DEFAULT_LAT, DEFAULT_LNG);
setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
getMarker().on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng();
});

initMessages(body);

let state = 'success';

submitBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (state === 'success') {
    showSuccessMsg();
  } else {
    showErrorMsg();
  }
});

resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
})
