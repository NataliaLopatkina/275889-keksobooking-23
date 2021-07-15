import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {getAddressField, setAdFormSubmit, getResetBtn} from './form.js';
import {initMap, setValueAddressField, initSimilarMarkers} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {getFilterForm, getSimilarAdvertisements} from './map-filter.js';

let advertisements = [];

addInactiveState();
initMap();
getData(
  (ads) => {
    advertisements = ads;

    initSimilarMarkers(getSimilarAdvertisements(advertisements));
    addActiveState();

    getFilterForm().addEventListener('change',
      debounce(
        ()=> {
          initSimilarMarkers(getSimilarAdvertisements(advertisements));
        },
      ),
    );
  },  () => {
    showAlert('Произошла ошибка загрузки данных. Попробуйте позже');
  });

setDefaultState(advertisements);
initMessages();
setValueAddressField(getAddressField());

const setSuccessSubmit = () => {
  setDefaultState(advertisements);
  showSuccessMsg();
};

setAdFormSubmit(setSuccessSubmit, showErrMsg);

getResetBtn().addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(advertisements);
});
