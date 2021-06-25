import {createAdvertisement} from'./data.js';
import {createElement} from './create-similar-element.js';
import {addInactiveState, addActiveState} from './change-state.js';
import './form/form.js';
import {initMap, showMainMarker, showSimilarMarkers, mainMarker} from './map.js';

const fieldAddress = document.querySelector('#address');
addInactiveState();

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const similarAdvertisiment = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

initMap(addActiveState());
showMainMarker();
showSimilarMarkers(similarAdvertisiment, createElement);

mainMarker.on('moveend', (evt) => fieldAddress.value = evt.target.getLatLng());