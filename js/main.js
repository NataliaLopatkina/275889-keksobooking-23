import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {setAdFormSubmit} from './form.js';
import {initMap, setValueField, initMainMarker, initSimilarMarkers, removeSimilarAdvertisiment} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import {getSimilarAdvertisiment, getFeatureRand} from './map-filter.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const SIMILAR_ADVERTISEMENT_COUNT = 10;
const DEFAULT_TYPE = 'bungalow';
const DEFAULT_PRICE = 'middle';
const DEFAULT_ROOMS_NUMBER = 3;
const DEFAULT_GUESTS_NUMBER = 'any';
const DEFAULT_FEATURES = ['wifi', 'washer', 'conditioner'];
const fieldAddress = document.querySelector('#address');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.ad-form__reset');

const filterForm = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');

addInactiveState();
initMap(DEFAULT_LAT, DEFAULT_LNG);
initMainMarker();
getData(
  (advertisements) => {
    initSimilarMarkers(getSimilarAdvertisiment(advertisements, DEFAULT_TYPE, DEFAULT_ROOMS_NUMBER, DEFAULT_GUESTS_NUMBER, DEFAULT_PRICE).slice(0, SIMILAR_ADVERTISEMENT_COUNT));
    addActiveState();
    filterForm.addEventListener('change', ()=> {
      removeSimilarAdvertisiment();
      initSimilarMarkers(getSimilarAdvertisiment(advertisements, typeFilter.value, roomsFilter.value, guestsFilter.value, priceFilter.value).slice(0, SIMILAR_ADVERTISEMENT_COUNT));
       
    });
  },
  () => {
    showAlert('Произошла ошибка загрузки данных. Попробуйте позже');
  },
);
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
