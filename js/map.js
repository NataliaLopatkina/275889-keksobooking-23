import {declinationOfNum, showAlert} from './utils.js';
import {getData} from './api.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;
let map;

const createSimilarAdvertisiment = (advertisement)=> {
  const ROOMS_DICT = {
    single: 'комната',
    several: 'комнаты',
    many: 'комнат',
  };

  const GUESTS_DICT = {
    single: 'гостя',
    several: 'гостей',
    many: 'гостей',
  };

  const templateCard = document.querySelector('#card').content.querySelector('.popup');
  const advertisementItem = templateCard.cloneNode(true);
  const featuresList = advertisementItem.querySelector('.popup__features');
  const photosList = advertisementItem.querySelector('.popup__photos');
  const avatar = advertisementItem.querySelector('.popup__avatar');

  const types = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

  const fillContent = (selector, content)=> {
    const element = advertisementItem.querySelector(selector);

    if (content === undefined) {
      element.remove();
    } else {
      element.textContent = content;
    }
  };

  const offer = advertisement.offer;
  const textRooms = declinationOfNum(offer.rooms, ROOMS_DICT);
  const textGuests = declinationOfNum(offer.guests, GUESTS_DICT);

  fillContent('.popup__title', offer.title);
  fillContent('.popup__text--address', offer.address);
  fillContent('.popup__text--price', `${offer.price} ₽/ночь`);
  fillContent('.popup__type', types[offer.type]);

  fillContent('.popup__text--capacity', `${offer.rooms} ${textRooms} для ${offer.guests} ${textGuests}`);
  fillContent('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const featuresItems = featuresList.querySelectorAll('.popup__feature');

  featuresItems.forEach((feature)=> {
    feature.remove();
  });

  if (offer.features !== undefined) {
    offer.features.forEach((feature)=> {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresList.appendChild(featureElement);
    });
  } else {
    featuresList.remove();
  }

  fillContent('.popup__description', offer.description);

  const photoItem = photosList.querySelectorAll('.popup__photo');
  photoItem.forEach((photo)=> {
    photo.remove();
  });

  if (offer.photos !== undefined) {
    offer.photos.forEach((photo)=> {
      const photoElement = document.createElement('img');
      photoElement.setAttribute('src', photo);
      photoElement.classList.add('popup__photo');
      photoElement.setAttribute('width', '45');
      photoElement.setAttribute('height', '40');
      photoElement.setAttribute('alt', 'Фотография жилья');

      photosList.appendChild(photoElement);
    });
  } else {
    photosList.remove();
  }

  avatar.setAttribute('src', advertisement.author.avatar);

  return advertisementItem;
};

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
    .on('load', ()=>{
      callback();

    });

  getData(
    (advertisements) => {
      const points = advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT);

      

      points.forEach((item)=> {

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
            createSimilarAdvertisiment(item),
          );
      });
    },
    () => {
        showAlert('Произошла ошибка гагрузки данных. Попробуйте позже');
    }
  );
};

const getMainMarker = ()=> {
  const mainPinIcon = L.icon({
    iconUrl: '../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  )
    .addTo(map);

  return mainMarker;
};

export {initMap, getMainMarker};
