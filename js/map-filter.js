const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

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

const findArrayElements = (array1, array2)=> {

  for(let index = 0; index < array2.length; index ++){
    if(array1.indexOf(array2[index]) === -1) {
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

const getSimilarAdvertisiment = (array, type, rooms, guests, price)=> {
  const newArrayAdvertisiment = [];

  for (let index = 0; index < array.length; index++) {
    const itemOffer = array[index].offer;

    if (itemOffer.type !== type && type !== 'any') {
      continue;
    } else if (itemOffer.rooms !== rooms && rooms !== 'any') {
      continue;
    } else if (itemOffer.guests !== guests && guests !== 'any') {
      continue;
    } else if (priceCompare(itemOffer.price) !== price && price !== 'any') {
      continue;
    } else if (itemOffer.features === undefined || findArrayElements(itemOffer.features, getFeaturesChecked()) === false) {
      continue;
    }

    newArrayAdvertisiment.push(array[index]);
  }

  return newArrayAdvertisiment.slice().sort(compareAdvertisiment);
};

export {getSimilarAdvertisiment, getFeaturesChecked};
