import {isEscEvent} from './utils.js';
let errMsgBlock, successMsgBlock;

const createSuccessMsg = () => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const block = templateSuccess.cloneNode(true);
  block.classList.add('hidden');
  document.body.appendChild(block);
  return document.querySelector('.success');
};

const createErrorMsg = () => {
  const templateErr = document.querySelector('#error').content.querySelector('.error');
  const block = templateErr.cloneNode(true);
  block.classList.add('hidden');
  document.body.appendChild(block);
  return document.querySelector('.error');
};

const initMessages = () => {
  successMsgBlock = createSuccessMsg();
  errMsgBlock = createErrorMsg();
};

const onErrMessageHide = (evt) => {
  if (isEscEvent || evt.target === errMsgBlock) {
    evt.preventDefault();
    errMsgBlock.classList.add('hidden');
    document.removeEventListener('keydown', onErrMessageHide);
  }
};

const onSuccessMessageHide = (evt) => {
  if (isEscEvent || evt.target === successMsgBlock) {
    evt.preventDefault();
    successMsgBlock.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessMessageHide);
  }
};

const showErrMsg = ()=> {
  errMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', onErrMessageHide);
  errMsgBlock.addEventListener('click', onErrMessageHide);
};

const showSuccessMsg = ()=> {
  successMsgBlock.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessMessageHide);
  successMsgBlock.addEventListener('click', onSuccessMessageHide());
};

export {initMessages, showErrMsg, showSuccessMsg};
