const getRandomPositiveInteger = (min, max)=> {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomPositiveFloat = (min, max, digits = 1)=> {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const declineOfNum = (num, expressions)=> {
  let result;
  let count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expressions[2];
  } else {
    count = count % 10;
    if (count === 1) {
      result = expressions[0];
    } else if (count >= 2 && count <= 4) {
      result = expressions[1];
    } else {
      result = expressions[2];
    }
  }
  return result;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {getRandomPositiveFloat, getRandomPositiveInteger, declineOfNum, isEscEvent};
