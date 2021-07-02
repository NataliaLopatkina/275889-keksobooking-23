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

const hideErrMessage = (evt) => {
  if (isEscEvent || evt.target === errMsgBlock) {
    evt.preventDefault();
    errMsgBlock.classList.add('hidden');
    document.removeEventListener('keydown', hideErrMessage);
  }
};

const hideSuccessMessage = (evt) => {
  if (isEscEvent || evt.target === successMsgBlock) {
    evt.preventDefault();
    successMsgBlock.classList.add('hidden');
    document.removeEventListener('keydown', hideSuccessMessage);
  }
};

const showErrMsg = ()=> {
  errMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', hideErrMessage);
  errMsgBlock.addEventListener('click', hideErrMessage);
};

const showSuccessMsg = ()=> {
  successMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', hideSuccessMessage);
  successMsgBlock.addEventListener('click', hideSuccessMessage);
};

export {initMessages, showErrMsg, showSuccessMsg};
