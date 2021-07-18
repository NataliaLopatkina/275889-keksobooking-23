import {getDeclinationOfNum} from './utils.js';
import {sendData} from './api.js';

const GUESTS_DICT = {
  single: 'гостя',
  several: 'гостей',
  many: 'гостей',
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const titleField = document.querySelector('#title');
const addressField = document.querySelector('#address');
const typeField = document.querySelector('#type');
const priceField = document.querySelector('#price');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const roomsField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const adForm = document.querySelector('.ad-form');
const submitBtn = document.querySelector('.ad-form__submit');
const resetBtn = document.querySelector('.ad-form__reset');

const prices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const guestsInRooms = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': [0],
};

const defaultValues = {
  type: 'flat',
  capacity: 1,
};

const addInvalidClass = (field) => {
  field.classList.add('invalid');
};

const removeInvalidClass = (field) => {
  field.classList.remove('invalid');
};

const checkFillField = (field) => {
  if (field.validity.valueMissing) {
    field.setCustomValidity('Обязательное поле');
    addInvalidClass(field);
  }
};

const checkValueField = (field, valueField, minValue, maxValue, minMessage, maxMessage) => {
  if (valueField < minValue) {
    field.setCustomValidity(minMessage);
    addInvalidClass(field);
  } else if (valueField > maxValue) {
    field.setCustomValidity(maxMessage);
    addInvalidClass(field);
  } else {
    field.setCustomValidity('');
    removeInvalidClass(field);
  }

  field.reportValidity();
};

const changeValue = (field, relatedField) => {
  relatedField.value = field.value;
};

const setOptionsCapacityField = (value)=> {
  const rooms = guestsInRooms[value];
  const options = capacityField.querySelectorAll('option');

  options.forEach((option)=> {
    option.remove();
  });

  rooms.forEach((room)=> {
    let capacityText = `для ${room} ${getDeclinationOfNum(room, GUESTS_DICT)}`;
    if (value === '100') {
      capacityText = 'не для гостей';
    }

    const newOption = document.createElement('option');
    newOption.value = room;
    newOption.textContent = capacityText;

    capacityField.appendChild(newOption);
  });
};

const setValuePriceField = (price)=> {
  priceField.setAttribute('min', price);
  priceField.setAttribute('placeholder', price);
};

titleField.addEventListener('invalid', () => {
  checkFillField(titleField);
});

titleField.addEventListener('input', () => {
  const valueField = titleField.value.length;
  const minMessage = `Ещё ${  MIN_TITLE_LENGTH - valueField } симв.`;
  const maxMessage = `Удалите лишние ${  valueField - MAX_TITLE_LENGTH } симв.`;
  checkValueField(titleField, valueField, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, minMessage, maxMessage);
});

typeField.addEventListener('change', (evt) => {
  const typeValue = evt.target.value;
  const minPrice = prices[typeValue];

  setValuePriceField(minPrice);

  if (priceField.value.length !== 0 && !priceField.checkValidity()) {
    addInvalidClass(priceField);
  }
});

priceField.addEventListener('invalid', () => {
  checkFillField(priceField);
});

priceField.addEventListener('input', () => {
  const valueField = priceField.value;
  const minPrice = +priceField.getAttribute('min');
  const minMessage = `Стоимость жилья должна быть больше или равна ${minPrice}`;
  const maxMessage = `Стоимость жилья не должна превышать ${MAX_PRICE}`;

  checkValueField(priceField, valueField, minPrice, MAX_PRICE, minMessage, maxMessage);
});

timeInField.addEventListener('change', () => {
  changeValue(timeInField, timeOutField);
});

timeOutField.addEventListener('change', () => {
  changeValue(timeOutField, timeInField);
});

roomsField.addEventListener('change', (evt)=> {
  const roomsFieldValue = evt.target.value;
  setOptionsCapacityField(roomsFieldValue);
});

const getAddressField = ()=> addressField;

const setAdFormSubmit = (onSuccess, onFail) => {
  submitBtn.addEventListener('click', (evt)=> {
    evt.preventDefault();

    const fields = adForm.querySelectorAll('input');

    for (let index = 0; index < fields.length; index ++) {
      if (!fields[index].checkValidity()) {
        return;
      }
    }

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(adForm),
    );},
  );
};

const getResetBtn = ()=> resetBtn;

const setDefaultValues = (addr)=> {
  addressField.value = addr;
  setValuePriceField(prices[defaultValues.type]);
  setOptionsCapacityField(defaultValues.capacity);
};

export {getAddressField, setAdFormSubmit, getResetBtn, setDefaultValues};
