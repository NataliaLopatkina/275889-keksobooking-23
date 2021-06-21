import {createAdvertisement} from'./data.js';
import {createElement} from './create-similar-element.js';
import './change-state.js';
import './form/form.js';
import './map.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const similarAdvertisiment = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());
const map = document.querySelector('#map-canvas');
const similarListAdvertisiment = [];

similarAdvertisiment.forEach((advertisiment)=> {
  similarListAdvertisiment.push(createElement(advertisiment));
});

map.appendChild(similarListAdvertisiment[0]);
