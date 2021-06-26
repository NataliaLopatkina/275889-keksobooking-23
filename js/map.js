import {createElement} from './create-similar-element.js';
import {createAdvertisement} from "./data.js";

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const similarAdvertisiment = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

let map;
let mainMarker;

const initMap = (callback)=> {

  map = L.map('map-canvas')
    .setView({
      lat: 35.6895,
      lng: 139.692,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map)
    .on('load', ()=> {
    callback();
  })
  const mainPinIcon = L.icon({
    iconUrl: '../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  )
  .addTo(map)

  similarAdvertisiment.forEach((item)=> {

    const icon = L.icon({
      iconUrl: '../../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const lat = item.location.lat;
    const lng = item.location.lng;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createElement(item)
      );
  });
}

const getMarker = () => {
  return mainMarker;
}

export {initMap, getMarker};
