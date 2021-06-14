import {getRandomPositiveFloat, getRandomPositiveInteger} from './get-randon-number.js';

const MIN_NUMBER_USER = 1;
const MAX_NUMBER_USER = 8;
const MIN_LIMIT_ADDRESS = 1;
const MAX_LIMIT_ADDRESS = 5;
const NUMBER_CHARACTERS = 5;
const MIN_PRICE = 8000;
const MAX_PRICE = 12000;
const MIN_NUMBER_ROOMS = 1;
const MAX_NUMBER_ROOMS = 5;
const MIN_NUMBER_GUESTS = 1;
const MAX_NUMBER_GUESTS = 7;
const MIN_LIMIT_LAT = 35.65000;
const MAX_LIMIT_LAT = 35.70000;
const MIN_LIMIT_LNG = 139.70000;
const MAX_LIMIT_LNG = 139.80000;

const TYPE_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const TIME_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createRandomArray = (array, newLength)=> {
  const copyArray = array.slice();
  const newArray = [];
  const elementsCount = Math.min(array.length, newLength);

  for (let index = 0; index < elementsCount; index++) {
    const randomIndex = getRandomPositiveInteger(0, copyArray.length - 1);
    const randomElement = copyArray[randomIndex];
    copyArray.splice(randomIndex, 1);
    newArray.push(randomElement);
  }

  return newArray;
};

const createAdvertisement = () => ({
  author: {
    avatar: `img/avatars/user0${getRandomPositiveInteger(MIN_NUMBER_USER, MAX_NUMBER_USER)}.png`,
  },
  offer: {
    title: 'Сдается жилье',
    address: `${getRandomPositiveFloat(MIN_LIMIT_ADDRESS, MAX_LIMIT_ADDRESS, NUMBER_CHARACTERS)  },${  getRandomPositiveFloat(MIN_LIMIT_ADDRESS, MAX_LIMIT_ADDRESS, NUMBER_CHARACTERS)}`,
    price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
    type: TYPE_HOUSE[getRandomPositiveInteger(0, TYPE_HOUSE.length - 1)],
    rooms: getRandomPositiveInteger(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS),
    guests: getRandomPositiveInteger(MIN_NUMBER_GUESTS, MAX_NUMBER_GUESTS),
    checkin: TIME_CHECKIN[getRandomPositiveInteger(0, TIME_CHECKIN.length - 1)],
    checkout: TIME_CHECKOUT[getRandomPositiveInteger(0, TIME_CHECKOUT.length - 1)],
    features: createRandomArray(FEATURES, getRandomPositiveInteger(1, FEATURES.length - 1)),
    description: 'Отличное жилье по доступной цене',
    photos: createRandomArray(PHOTOS, getRandomPositiveInteger(1, PHOTOS.length - 1)),
  },
  location: {
    lat: getRandomPositiveFloat(MIN_LIMIT_LAT, MAX_LIMIT_LAT, NUMBER_CHARACTERS),
    lng: getRandomPositiveFloat(MIN_LIMIT_LNG, MAX_LIMIT_LNG, NUMBER_CHARACTERS),
  },
});

export {createAdvertisement};
