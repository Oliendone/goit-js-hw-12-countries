import './css/styles.scss';
import '../node_modules/toastr/build/toastr.css';
import toastr from 'toastr';
import fetchCountries from './js/fetchCountries';
import options from './js/toastrOptions';
import refs from './js/refs';

import countries from './templates/countries.hbs';
import singleCountry from './templates/singleCountry.hbs';

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(handler, 500));

function handler(event) {
  const inputValue = event.target.value;
  if (inputValue !== '') {
    fetchCountries(inputValue)
      .then(res => {
        const obj = res.map(country => country);

        if (res.length === 1) {
          clearPage();
          console.log(obj);
          refs.listCountries.insertAdjacentHTML(
            'beforeend',
            singleCountry(obj),
          );
        } else if (res.length <= 10) {
          clearPage();
          refs.listCountries.insertAdjacentHTML('beforeend', countries(obj));
          refs.listCountries.style.listStyle = 'circle';
        } else {
          toastr.warning('Слишком много совпадений!');
        }
      })
      .catch(error => toastr.error('По запросу нету результатов!'));
  }
}

function clearPage() {
  refs.listCountries.innerHTML = '';
}
