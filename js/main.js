import {addInactiveState, addActiveState, setDefaultState} from './change-state.js';
import {getInputAddress, setAdFormSubmit, getResetBtn} from './form.js';
import {initMap, setValueField, initSimilarMarkers} from './map.js';
import {initMessages, showErrMsg, showSuccessMsg} from './message.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {getFilterForm, getSimilarAdvertisements} from './map-filter.js';

const body = document.querySelector('body');
let similarAdvertisements = [];

addInactiveState();
initMap();
getData(
  (advertisements) => {
    similarAdvertisements = advertisements;

    initSimilarMarkers(getSimilarAdvertisements(similarAdvertisements));
    addActiveState();

    getFilterForm().addEventListener('change',
      debounce(
        ()=> {
          initSimilarMarkers(getSimilarAdvertisements(similarAdvertisements));
        },
      ),
    );
  },  () => {
    showAlert('Произошла ошибка загрузки данных. Попробуйте позже');
  });

setDefaultState(similarAdvertisements);
initMessages(body);
setValueField(getInputAddress());

const setSuccessSubmit = () => {
  setDefaultState(similarAdvertisements);
  showSuccessMsg();
};

setAdFormSubmit(setSuccessSubmit, showErrMsg);

getResetBtn().addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState(similarAdvertisements);
});
