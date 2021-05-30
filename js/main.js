// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const generateRandomInteger = (min, max) => {

  if (min >= max || min < 0) {
    throw new Error('Неправильный диапазон');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

generateRandomInteger(10, 17);

const generateRandomFloat = (min, max, numberCharacters)=> {

  if (min >= max) {
    throw new Error('Неправильный диапазон');
  }
  return +(Math.random()*(max - min) + min).toFixed(numberCharacters);
};

generateRandomFloat(1.5, 1.6, 5);
