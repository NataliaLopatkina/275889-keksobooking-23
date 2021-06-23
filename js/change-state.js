const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filtersFieldset = filters.querySelector('fieldset');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
};

const disableFielset = (fieldset) => {
  fieldset.forEach((item)=> {
    item.disabled = true;
  });
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
};

const enableFielset = (fieldset) => {
  fieldset.forEach((item)=> {
    item.disabled = false;
  });
};

const addInactiveState = () => {
  disableForm(adForm);
  disableFielset(formFieldset);
  disableForm(filters);
  disableFielset(filtersFieldset);
};

const addActiveState = () => {
  enableForm(adForm);
  enableFielset(formFieldset);
  enableForm(filters);
  enableFielset(filtersFieldset);
};

export {addInactiveState, addActiveState};
