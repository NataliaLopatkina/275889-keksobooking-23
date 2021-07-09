import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {setAdFormSubmit} from './form.js';
import {initMap, setValueField, initMainMarker, initSimilarMarkers, removeSimilarAdvertisiment} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {getSimilarAdvertisiment} from './map-filter.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const SIMILAR_ADVERTISEMENT_COUNT = 10;
const fieldAddress = document.querySelector('#address');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.ad-form__reset');
const filterForm = document.querySelector('.map__filters');

addInactiveState();
initMap(DEFAULT_LAT, DEFAULT_LNG);
initMainMarker();
getData(
  (advertisements) => {
    initSimilarMarkers(getSimilarAdvertisiment(advertisements).slice(0, SIMILAR_ADVERTISEMENT_COUNT));
    addActiveState();

    filterForm.addEventListener('change',
      debounce(
        ()=> {
          removeSimilarAdvertisiment();
          initSimilarMarkers(getSimilarAdvertisiment(advertisements)
            .slice(0, SIMILAR_ADVERTISEMENT_COUNT));
        }
      )
    );
  },  () => {
    showAlert('Произошла ошибка загрузки данных. Попробуйте позже');
  })
setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
initMessages(body);

setValueField(fieldAddress);

const setSuccessSubmit = () => {
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
  showSuccessMsg();
};

setAdFormSubmit(setSuccessSubmit, showErrMsg);

// initResetBtn();
resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(DEFAULT_LAT, DEFAULT_LNG);
});
