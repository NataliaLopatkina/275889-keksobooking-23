const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const disableForm = (form) => {
  const children = form.children;
  form.classList.add('ad-form--disabled');

  for (let index = 0; index < children.length; index++) {
    children[index].disabled = true;
  }
};

const enableForm = (form) => {
  const children = form.children;
  form.classList.remove('ad-form--disabled');

  for (let index = 0; index < children.length; index++) {
    children[index].disabled = false;
  }
};

const addInactiveState = () => {
  disableForm(adForm);
  disableForm(filters);
};

const addActiveState = () => {
  enableForm(adForm);
  enableForm(filters);
};

export {addInactiveState, addActiveState};
