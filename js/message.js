import {isEscEvent} from './utils.js';
let errMsgBlock, successMsgBlock;

const createSuccessMsg = (body) => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const block = templateSuccess.cloneNode(true);
  block.classList.add('hidden');
  body.appendChild(block);
  return document.querySelector('.success');
};

const createErrorMsg = (body) => {
  const templateErr = document.querySelector('#error').content.querySelector('.error');
  const block = templateErr.cloneNode(true);
  block.classList.add('hidden');
  body.appendChild(block);
  return document.querySelector('.error');
};

const initMessages = (body) => {
  successMsgBlock = createSuccessMsg(body);
  errMsgBlock = createErrorMsg(body);
};

const onErrMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideErrMessage();
  }
};

const onErrMessageClick = (evt) => {
  if (evt.target === errMsgBlock) {
    evt.preventDefault();
    hideErrMessage();
  }
};

const onErrMessageClickBtn = (evt) => {
  evt.preventDefault();
  hideErrMessage();
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
};

const onSuccessMessageClick = (evt) => {
  if (evt.target === successMsgBlock) {
    evt.preventDefault();
    hideSuccessMessage();
  }
};

const showSuccessMsg = ()=> {
  successMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  successMsgBlock.addEventListener('click', onSuccessMessageClick);
};

const showErrorMsg = ()=> {
  errMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', onErrMessageEscKeydown);
  errMsgBlock.addEventListener('click', onErrMessageClick);
  const buttonClose = errMsgBlock.querySelector('.error__button');
  buttonClose.addEventListener('click', onErrMessageClickBtn);
};

const hideErrMessage = ()=> {
  errMsgBlock.classList.add('hidden');
  document.removeEventListener('keydown', onErrMessageEscKeydown);
  errMsgBlock.removeEventListener('click', onErrMessageClick);
  const buttonClose = errMsgBlock.querySelector('.error__button');
  buttonClose.removeEventListener('click', onErrMessageClickBtn);
};

const hideSuccessMessage = ()=> {
  successMsgBlock.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  successMsgBlock.removeEventListener('click', onSuccessMessageClick);
};

export {initMessages, showErrorMsg, showSuccessMsg};
