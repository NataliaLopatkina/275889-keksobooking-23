import {createAdvertisement} from './create-data.js';
import './change-state.js';
import './form/form.js';
import './map.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());
