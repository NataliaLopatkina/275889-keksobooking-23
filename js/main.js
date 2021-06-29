import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import './form.js';
import {initMap, getMainMarker} from './map.js';
import {showErrorMsg, showSuccessMsg, initMessages} from './message.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const fieldAddress = document.querySelector('#address');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.ad-form__reset');

addInactiveState();
initMap(addActiveState, DEFAULT_LAT, DEFAULT_LNG);
setDefaultState(DEFAULT_LAT, DEFAULT_LNG);

getMainMarker(DEFAULT_LAT, DEFAULT_LNG).on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng();
});

initMessages(body);

resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
});