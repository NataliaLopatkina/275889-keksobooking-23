const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const type = document.querySelector('#type');
const typeOptions = type.querySelectorAll('option');
const MAX_PRICE = 1000000;
const priceInput = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeInOptions = timeIn.querySelectorAll('option');
const timeOut = document.querySelector('#timeout');
const timeOutOptions = timeOut.querySelectorAll('option');
const roomNumber = document.querySelector('#room_number');
const roomNumberOptions = roomNumber.querySelectorAll('option');
const capacity = document.querySelector('#capacity');
const capacityOptionsList = capacity.querySelectorAll('option');

const priceList = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomNumberList = {
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
  const minPrice = priceList[typeValue];
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

roomNumber.addEventListener('change', (evt)=> {
  const roomNumberValue = evt.target.value;
  const capacityList = roomNumberList[roomNumberValue];
  const capacityOptions = capacity.querySelector('option');

  capacityOptions.remove();

  capacityList.forEach((item)=> {
    let capacityText = 'для 1 гостя';
    switch (roomNumberValue) {
      case '2':
      case '3':
        capacityText = `для ${item} гостей`;
        break;
      case '100':
        capacityText = item;
        break;
    }

    const newOption = document.createElement('option');
    newOption.value = item;
    newOption.textContent = capacityText;

    capacity.appendChild(newOption);
    toggleSelected(roomNumberOptions, evt.target);
    toggleSelected(capacityOptionsList, capacity);
  });
});
