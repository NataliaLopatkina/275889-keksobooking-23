import {declineOfNum} from './utils.js';

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

const fillContent = (selector, content) => {
  const element = advertisementItem.querySelector(selector);

  if (content === '') {
    element.remove();
  } else {
    element.textContent = content;
  }
};

const createElement = (advertisement) => {
  const offer = advertisement.offer;
  const roomsExpressions = [' комната', ' комнаты', ' комнат'];
  const guestsExpression = [' гостя', ' гостей', ' гостей'];
  const textRooms = declineOfNum(offer.rooms, roomsExpressions);
  const textGuests = declineOfNum(offer.guests, guestsExpression);

  fillContent('.popup__title', offer.title);
  fillContent('.popup__text--address', offer.address);
  fillContent('.popup__text--price', `${offer.price} ₽/ночь`);
  fillContent('.popup__type', types[offer.type]);

  fillContent('.popup__text--capacity', `${offer.rooms} ${textRooms} для ${offer.guests} ${textGuests}`);
  fillContent('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const featuresItems = featuresList.querySelectorAll('.popup__feature');

  featuresItems.forEach((feature) => {
    feature.remove();
  });

  offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresList.appendChild(featureElement);
  });

  fillContent('.popup__description', offer.description);

  const photoItem = photosList.querySelectorAll('.popup__photo');
  photoItem.forEach((photo) => {
    photo.remove();
  });

  offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.setAttribute('src', photo);
    photoElement.classList.add('popup__photo');
    photoElement.setAttribute('width', '45');
    photoElement.setAttribute('height', '40');
    photoElement.setAttribute('alt', 'Фотография жилья');

    photosList.appendChild(photoElement);
  });

  avatar.setAttribute('src', advertisement.author.avatar);

  return advertisementItem;
};

export {createElement};
