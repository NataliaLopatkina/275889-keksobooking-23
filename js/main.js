import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {getInputAddress, setAdFormSubmit, getResetBtn} from './form.js';
import {initMap, setValueField, initMainMarker, initSimilarMarkers, removeSimilarAdvertisiment} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {getFilterForm, getSimilarAdvertisiment} from './map-filter.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const SIMILAR_ADVERTISEMENT_COUNT = 10;
const body = document.querySelector('body');
let similarAdvertisiments = [];

addInactiveState();
initMap(DEFAULT_LAT, DEFAULT_LNG);
initMainMarker();
getData(
  (advertisements) => {
    initSimilarMarkers(getSimilarAdvertisiment(advertisements).slice(0, SIMILAR_ADVERTISEMENT_COUNT));
    addActiveState();
    similarAdvertisiments = advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT);

    getFilterForm().addEventListener('change',
      debounce(
        ()=> {
          removeSimilarAdvertisiment();
          initSimilarMarkers(getSimilarAdvertisiment(advertisements)
            .slice(0, SIMILAR_ADVERTISEMENT_COUNT));
        },
      ),
    );
  },  () => {
    showAlert('Произошла ошибка загрузки данных. Попробуйте позже');
  });

setDefaultState(DEFAULT_LAT, DEFAULT_LNG, similarAdvertisiments);
initMessages(body);
setValueField(getInputAddress());

const setSuccessSubmit = () => {
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG, similarAdvertisiments);
  showSuccessMsg();
};

setAdFormSubmit(setSuccessSubmit, showErrMsg);

getResetBtn().addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG, similarAdvertisiments);
});
