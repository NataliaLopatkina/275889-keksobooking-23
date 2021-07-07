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

const getFeatureRand = (advertisement)=> {
    const featureWifi = document.querySelector('#filter-wifi');
    const featureDishwasher = document.querySelector('#filter-dishwasher');
    const featureParking = document.querySelector('#filter-parking');
    const featureWasher = document.querySelector('#filter-washer');
    const featureElevator = document.querySelector('#filter-elevator');
    const featureConditioner = document.querySelector('#filter-conditioner');

    let rank = 0;

    if (featureWifi.checked && advertisement.features.includes(featureWifi.value)) {
        rank += 1
    }
    if (featureDishwasher.checked && advertisement.features.includes(featureDishwasher.value)) {
        rank +=1
    }
    if (featureParking.checked && advertisement.features.includes(featureParking.value)) {
        rank +=1
    }
    if (featureWasher.checked && advertisement.features.includes(featureWasher.value)) {
        rank +=1
    }
    if (featureElevator.checked && advertisement.features.includes(featureElevator.value)) {
        rank +=1
    }
    if (featureConditioner.checked && advertisement.features.includes(featureConditioner.value)) {
        rank +=1
    }

    console.log(rank) ;
}

const getSimilarAdvertisiment = (array, type, rooms, guests, price)=> {
  let newArrayAdvertisiment = [];
  for (let index = 0; index < array.length; index++) {
    const itemOffer = array[index].offer;

    if (itemOffer.type !== type && type !== 'any') {
        continue
    } else if (itemOffer.rooms !== rooms && rooms !== 'any') {
        continue
    } else if (itemOffer.guests !== guests && guests !== 'any') {
        continue
    }
     else if (priceCompare(itemOffer.price) !== price && price !== 'any') {
        continue;
     }
    else {
        newArrayAdvertisiment.push(array[index])
    }

    getFeatureRand(itemOffer)
  }

  return newArrayAdvertisiment;
};


export {getSimilarAdvertisiment, getFeatureRand};
