const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const filterForm = document.querySelector('.map__filters');

const getFilterForm = ()=> filterForm;

const comparePrice = (price)=> {
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

const getFeaturesChecked = ()=> Array.from(document.querySelectorAll('.map__checkbox:checked')).map((chkbx) => chkbx.value);

const isContainFeatures = (elements1, elements2)=> {
  if (elements1.length === 0) {
    return false;
  }
  for(let index = 0; index < elements2.length; index ++){
    if(elements1.indexOf(elements2[index]) === -1) {
      return false;
    }
  }

  return true;
};

const getAdvertisimentRank = (advertisement)=> Array.isArray(advertisement.offer.features) ? advertisement.offer.features.length : 0;

const compareAdvertisements = (advertisementA, advertisementB)=> {
  const rankA = getAdvertisimentRank(advertisementA);
  const rankB = getAdvertisimentRank(advertisementB);

  return rankB - rankA;
};

const getSimilarAdvertisements = (array)=> {
  const newArrayAdvertisements = [];

  for (let index = 0; index < array.length; index++) {
    const itemOffer = array[index].offer;

    if (itemOffer.type !== typeFilter.value && typeFilter.value !== 'any') {
      continue;
    } else if (itemOffer.rooms !== roomsFilter.value && roomsFilter.value !== 'any') {
      continue;
    } else if (itemOffer.guests !== guestsFilter.value && guestsFilter.value !== 'any') {
      continue;
    } else if (comparePrice(itemOffer.price) !== priceFilter.value && priceFilter.value !== 'any') {
      continue;
    } else if (!Array.isArray(itemOffer.features) && getFeaturesChecked().length !== 0) {
      continue;
    } else if (Array.isArray(itemOffer.features) && isContainFeatures(itemOffer.features, getFeaturesChecked()) === false) {
      continue;
    }

    newArrayAdvertisements.push(array[index]);
  }

  return newArrayAdvertisements.slice().sort(compareAdvertisements);
};

export {getFilterForm, getSimilarAdvertisements};
