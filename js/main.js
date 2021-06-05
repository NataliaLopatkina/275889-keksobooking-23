function getRandomPositiveInteger (a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    
    return Math.floor(result);
  };

  function getRandomPositiveFloat (a, b, digits = 1) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;

    return result.toFixed(digits);
  };

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
    'hotel'
];

const TIME_CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
];

const TIME_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
];

const FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator'
];

const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createRandomArray = (array)=> {
    var newArray = new Array;
    for (let i = 0; i < getRandomPositiveInteger(1, array.length); i++) {
        let element = array[getRandomPositiveInteger(0, array.length - 1)];
        if (newArray.indexOf(element) === -1) {
            newArray.push(element);
        }
    };

    return newArray;
}

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const createAdvertisement = () => {
    return {
        author: {
            avatar: 'img/avatars/user0'+getRandomPositiveInteger(MIN_NUMBER_USER, MAX_NUMBER_USER)+'.png'
        },
        offer: {
            title: 'Сдается жилье',
            address: getRandomPositiveFloat(MIN_LIMIT_ADDRESS, MAX_LIMIT_ADDRESS, NUMBER_CHARACTERS) + ',' + getRandomPositiveFloat(MIN_LIMIT_ADDRESS, MAX_LIMIT_ADDRESS, NUMBER_CHARACTERS),
            price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
            type: TYPE_HOUSE[getRandomPositiveInteger(0, TYPE_HOUSE.length - 1)],
            rooms: getRandomPositiveInteger(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS),
            guests: getRandomPositiveInteger(MIN_NUMBER_GUESTS, MAX_NUMBER_GUESTS),
            checkin: TIME_CHECKIN[getRandomPositiveInteger(0, TIME_CHECKIN.length - 1)],
            checkout: TIME_CHECKOUT[getRandomPositiveInteger(0, TIME_CHECKOUT.length - 1)],
            features: createRandomArray(FEATURES),
            description: 'Отличное жилье по доступной цене',
            photos: createRandomArray(PHOTOS),
        },
        location: {
            lat: getRandomPositiveFloat(MIN_LIMIT_LAT, MAX_LIMIT_LAT, NUMBER_CHARACTERS),
            lng: getRandomPositiveFloat(MIN_LIMIT_LNG, MAX_LIMIT_LNG, NUMBER_CHARACTERS),
        }
    }
}

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

console.log(similarAdvertisement)