const ERROR_INVALID = 'Must be a valid date';
const ERROR_EMPTY = 'This field is required';
const CURRENT_DATE = new Date();

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const resultYears = document.getElementById('years');
const resultMonths = document.getElementById('months');
const resultDays = document.getElementById('days');

const setErrorWholeForm = (name) => `Must be ${name.toLowerCase()}`;
const getDays = (year, month) => new Date(year, month, 0).getDate();

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
