import {createSimilarAdvertisement} from './popup.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const defaultPosition = {
  lat: 35.6895,
  lng: 139.692,
};
let map, layerGroup;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  defaultPosition,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = ()=> {

  map = L.map('map-canvas').setView(defaultPosition, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);

  mainMarker.addTo(map);
};

const initSimilarMarkers = (points)=> {

  if (layerGroup) {
    layerGroup.clearLayers();
  }

  layerGroup = L.layerGroup().addTo(map);

  points.slice(0, SIMILAR_ADVERTISEMENT_COUNT).forEach((item)=> {

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(layerGroup)
      .bindPopup(
        createSimilarAdvertisement(item),
      );
  });
};

const setValueField = (field) => {
  mainMarker.on('moveend', (evt) => {
    const curPosition = evt.target.getLatLng();
    field.value = `${curPosition.lat.toFixed(5)}, ${curPosition.lng.toFixed(5)}`;
  });
};

const setDefaultPositionMarker = () => {
  mainMarker.setLatLng(defaultPosition);
};


export {initMap, setDefaultPositionMarker, initSimilarMarkers, setValueField, defaultPosition};
