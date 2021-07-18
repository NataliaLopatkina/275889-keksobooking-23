import {getDeclinationOfNum} from './utils.js';

const createSimilarAdvertisement = (advertisement)=> {
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

  const types = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

  const templateCard = document.querySelector('#card').content.querySelector('.popup');
  const advertisementItem = templateCard.cloneNode(true);
  const featuresList = advertisementItem.querySelector('.popup__features');
  const photosList = advertisementItem.querySelector('.popup__photos');
  const avatar = advertisementItem.querySelector('.popup__avatar');

  const fillContent = (selector, content)=> {
    const element = advertisementItem.querySelector(selector);

    if (content === undefined) {
      element.remove();
    } else {
      element.textContent = content;
    }
  };

  const offer = advertisement.offer;
  const textRooms = getDeclinationOfNum(offer.rooms, ROOMS_DICT);
  const textGuests = getDeclinationOfNum(offer.guests, GUESTS_DICT);

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

  if (Array.isArray(offer.features)) {
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

  if (Array.isArray(offer.photos)) {
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

export {createSimilarAdvertisement};
