import './css/styles.css';
import Notiflix from 'notiflix';
import FOO from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('[id="search-box"]');
input.addEventListener('input', debounce((e) => onInput(e), DEBOUNCE_DELAY));

const list = document.querySelector('.country-list');

function onInput(e) {
    e.preventDefault();
    const onInputValue = e.target.value.trim().toLowerCase();

    if (onInputValue === '') {
        return;
    }

    FOO.fetchCountries(onInputValue)
    .then ((allCountries) => {
        const newArrey = [];
        for (const country of allCountries) {
            if (country.name.common.toLowerCase().includes(findCountry)) {
                newArrey.push(country);
            }
        }
        return newArrey;
    })
    .then(makeMarkup)
    .catch ((err) => {
        if (err.message === '404') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    console.log(err);
    });
}

function makeMarkup(arr) {
    if (arr.length < 1) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (arr.length === 1) {
        list.innerHTML = doMarkup(arr);
    } else if (arr.length >= 2 && arr.length <= 10) {
        list.innerHTML = createMarkup(arr);
    } else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

function doMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { common }, capital, population, languages}) => 
    `<li>
    <h2><img src="${svg}" alt="${alt}" width='30'>  ${common}</h2>
    <h3>Capital: ${capital}</h3>
    <h3>Population: ${population}</h3>
    <h3>languages: ${Object.values(languages)}</h3>
    </li>`).join('');
}

function createMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { common } }) => 
    `<li>
        <h3><img src="${svg}" alt="${alt}" width='25'>  ${common}</h3>
    </li>`).join('');
}

