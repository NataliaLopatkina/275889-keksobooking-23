import {declinationOfNum} from './utils.js';
import {sendData} from './api.js';

const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const address = document.querySelector('#address');
const type = document.querySelector('#type');
const typeOptions = type.querySelectorAll('option');
const MAX_PRICE = 1000000;
const priceInput = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeInOptions = timeIn.querySelectorAll('option');
const timeOut = document.querySelector('#timeout');
const timeOutOptions = timeOut.querySelectorAll('option');
const roomsNumber = document.querySelector('#room_number');
const roomsNumberOptions = roomsNumber.querySelectorAll('option');
const capacity = document.querySelector('#capacity');
let capacityOptionsList = capacity.querySelectorAll('option');
const formButtonSubmit = document.querySelector('.ad-form__submit');
const adForm = document.querySelector('.ad-form');
const resetBtn = document.querySelector('.ad-form__reset');

const GUESTS_DICT = {
  single: 'гостя',
  several: 'гостей',
  many: 'гостей',
};

const prices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const rooms = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': ['не для гостей'],
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

const toggleSelected = (elements, element) => {
  elements.forEach((item) => {
    item.removeAttribute('selected');
  });

  element.options[element.selectedIndex].setAttribute('selected', 'selected');
};

const changeValue = (field, relatedField) => {
  relatedField.value = field.value;
  toggleSelected(timeInOptions, field);
  toggleSelected(timeOutOptions, relatedField);
};

const setDefaultAddress = (addr) => {
  address.value = addr;
};

titleInput.addEventListener('invalid', () => {
  checkFillField(titleInput);
});

titleInput.addEventListener('input', () => {
  const valueField = titleInput.value.length;
  const minMessage = `Ещё ${  MIN_TITLE_LENGTH - valueField } симв.`;
  const maxMessage = `Удалите лишние ${  valueField - MAX_TITLE_LENGTH } симв.`;
  checkValueField(titleInput, valueField, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, minMessage, maxMessage);
});

type.addEventListener('change', (evt) => {
  const typeValue = evt.target.value;
  const minPrice = prices[typeValue];
  toggleSelected(typeOptions, evt.target);

  priceInput.setAttribute('min', minPrice);
  priceInput.setAttribute('placeholder', minPrice);
});

priceInput.addEventListener('invalid', () => {
  checkFillField(priceInput);
});

priceInput.addEventListener('input', () => {
  const valueField = priceInput.value;
  const minPrice = +priceInput.getAttribute('min');
  const minMessage = `Стоимость жилья должна быть больше или равна ${minPrice}`;
  const maxMessage = `Стоимость жилья не должна превышать ${MAX_PRICE}`;

  checkValueField(priceInput, valueField, minPrice, MAX_PRICE, minMessage, maxMessage);
});

timeIn.addEventListener('change', () => {
  changeValue(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  changeValue(timeOut, timeIn);
});

roomsNumber.addEventListener('change', (evt)=> {
  const roomsNumberValue = evt.target.value;
  const capacityList = rooms[roomsNumberValue];
  const capacityOptions = capacity.querySelectorAll('option');

  capacityOptions.forEach((item)=> {
    item.remove();
  });

  capacityList.forEach((item)=> {
    let capacityText = `для ${item} ${declinationOfNum(item, GUESTS_DICT)}`;
    if (roomsNumberValue === '100') {
      capacityText = 'не для гостей';
    }

    const newOption = document.createElement('option');
    newOption.value = item;
    newOption.textContent = capacityText;

    capacity.appendChild(newOption);
  });
  toggleSelected(roomsNumberOptions, evt.target);
  toggleSelected(capacityOptionsList, capacity);
});

capacity.addEventListener('change', (evt)=> {
  capacityOptionsList = capacity.querySelectorAll('option');
  toggleSelected(capacityOptionsList, evt.target);
});

const getInputAddress = ()=> address;

const setAdFormSubmit = (onSuccess, onFail) => {
  formButtonSubmit.addEventListener('click', (evt)=> {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(adForm),
    );},
  );
};

const getResetBtn = ()=> resetBtn;

export {setDefaultAddress, getInputAddress, setAdFormSubmit, getResetBtn};
