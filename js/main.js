import {addInactiveState, addActiveState} from './change-state.js';
import './form.js';
import {initMap, getMainMarker} from './map.js';

const fieldAddress = document.querySelector('#address');

addInactiveState();
initMap(addActiveState);

getMainMarker().on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng();
});

