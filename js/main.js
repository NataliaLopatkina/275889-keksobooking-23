import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {setAdFormSubmit} from './form.js';
import {initMap, setValueField, initMainMarker} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const fieldAddress = document.querySelector('#address');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.ad-form__reset');

addInactiveState();
initMap(addActiveState, DEFAULT_LAT, DEFAULT_LNG);
initMainMarker();
setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
initMessages(body);

setValueField(fieldAddress);

const setSuccessSubmit = () => {
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
  showSuccessMsg();
};

setAdFormSubmit(setSuccessSubmit, showErrMsg);

resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
});
