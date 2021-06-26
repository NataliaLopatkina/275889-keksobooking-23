import {addInactiveState, addActiveState} from './change-state.js';
import './form.js';
import {initMap, getMarker} from './map.js';

const fieldAddress = document.querySelector('#address');

addInactiveState();
initMap(addActiveState);

getMarker().on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng();
});
