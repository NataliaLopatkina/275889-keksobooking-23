const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const filterForm = document.querySelector('.map__filters');

const getFilterForm = ()=> filterForm;

const priceCompare = (price)=> {
  let valuePrice;
  if (price < MIN_PRICE) {
    valuePrice = 'low';
  } else if (price >= MIN_PRICE && price <= MAX_PRICE) {
    valuePrice = 'middle';
  } else if (price > MAX_PRICE) {
    valuePrice = 'high';
  }

  return valuePrice;
};

const getFeaturesChecked = ()=> {
  const checkboxList = document.querySelectorAll('.map__checkbox');
  const arrayFeatures = [];

  checkboxList.forEach((item)=> {
    if (item.checked) {
      arrayFeatures.push(item.value);
    }
  });

  return arrayFeatures;
};

const findArrayElements = (elements1, elements2)=> {
  if (elements2.length === 0 ) {
    return true;
  }
  for(let index = 0; index < elements2.length; index ++){
    if(elements1.indexOf(elements2[index]) === -1) {
      return false;
    }
  }

  return true;
};

const getAdvertisimentRank = (advertisement)=> advertisement.offer.features.length;

const compareAdvertisiment = (advertisementA, advertisementsB)=> {
  const rankA = getAdvertisimentRank(advertisementA);
  const rankB = getAdvertisimentRank(advertisementsB);

  return rankA - rankB;
};

const getSimilarAdvertisiment = (array)=> {
  const newArrayAdvertisiment = [];

  for (let index = 0; index < array.length; index++) {
    const itemOffer = array[index].offer;

    if (itemOffer.type !== typeFilter.value && typeFilter.value !== 'any') {
      continue;
    } else if (itemOffer.rooms !== roomsFilter.value && roomsFilter.value !== 'any') {
      continue;
    } else if (itemOffer.guests !== guestsFilter.value && guestsFilter.value !== 'any') {
      continue;
    } else if (priceCompare(itemOffer.price) !== priceFilter.value && priceFilter.value !== 'any') {
      continue;
    } else if (itemOffer.features === undefined || findArrayElements(itemOffer.features, getFeaturesChecked()) === false) {
      continue;
    }

    newArrayAdvertisiment.push(array[index]);
  }

  return newArrayAdvertisiment.slice().sort(compareAdvertisiment);
};

export {getFilterForm, getSimilarAdvertisiment};
