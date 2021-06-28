import {createAdvertisement} from './data.js';
import {addInactiveState, addActiveState} from './change-state.js';
import './form.js';
import {initMap, getMainMarker} from './map.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const similarAdvertisiment = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());
const fieldAddress = document.querySelector('#address');

addInactiveState();
initMap(addActiveState, similarAdvertisiment);

getMainMarker().on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng();
});
