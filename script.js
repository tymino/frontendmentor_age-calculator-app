const CURRENT_DATE = new Date();
const ERROR_INVALID = 'Must be a valid date';
const ERROR_EMPTY = 'This field is required';

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const resultYears = document.getElementById('years');
const resultMonths = document.getElementById('months');
const resultDays = document.getElementById('days');

const resultBtn = document.getElementById('result-btn');

const setErrorWholeForm = (name) => `Must be ${name.toLowerCase()}`;
const getDays = (year, month) => new Date(year, month, 0).getDate();

const convertDateFromInputs = () => {
  const day = inputDay.value;
  const month = inputMonth.value;
  const year = inputYear.value;

  return `${year}.${month}.${day}`;
};

const updateInput = (target, maxValue, errorText, length = 2) => {
  const parent = target.parentElement;
  const errorDiv = target.parentElement.querySelector('.input__error');

  if (target.value.length > length) {
    parent.classList.add('input--error');
    errorDiv.innerHTML = ERROR_INVALID;
  }

  if (target.value.length <= length) {
    parent.classList.remove('input--error');
    errorDiv.innerHTML = '';
  }

  if (target.value > maxValue) {
    parent.classList.add('input--error');
    errorDiv.innerHTML = setErrorWholeForm(errorText);
  }
};

const checkValidResult = () => {
  const date = convertDateFromInputs();
  const isValid = new Date(date).toString() !== 'Invalid Date';

  return isValid;
};

const setInvalidInput = () => {
  const parentClassName = inputDay.parentElement.className;
  const errorDivs = document.getElementsByClassName(parentClassName);

  [...errorDivs].forEach((elem) => {
    elem.classList.add('input--error');
  });

  inputDay.parentElement.querySelector('.input__error').innerHTML =
    ERROR_INVALID;
};

const setResult = () => {
  const birthDate = new Date(convertDateFromInputs());

  const totalDays = Math.ceil(
    Math.abs(birthDate.getTime() - CURRENT_DATE.getTime()) / (1000 * 3600 * 24)
  );
  const year = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - year * 365) / 30);
  const days = Math.floor(totalDays - year * 365 - months * 30);

  resultYears.innerHTML = year;
  resultMonths.innerHTML = months;
  resultDays.innerHTML = `~${days}`;
};

const getResult = () => {
  if (checkValidResult()) {
    setResult();
  } else {
    setInvalidInput();
  }
};

inputDay.addEventListener('input', ({ target }) => {
  const maxDays = getDays(CURRENT_DATE.getDate(), inputMonth.value) || 31;
  updateInput(target, maxDays, 'a valid day');
});

inputMonth.addEventListener('input', ({ target }) => {
  updateInput(target, 12, 'a valid month');
});

inputYear.addEventListener('input', ({ target }) => {
  updateInput(target, CURRENT_DATE.getFullYear(), 'in the past', 4);
});

resultBtn.addEventListener('click', getResult);
