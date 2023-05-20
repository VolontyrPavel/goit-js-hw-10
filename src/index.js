import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const MY_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'

const input = document.querySelector('[id="search-box"]');
input.addEventListener('input', onInput);

const list = document.querySelector('.country-list');

function onInput(e) {
    e.preventDefault();
    const findCountry = e.currentTarget.value.toLowerCase();
    if (findCountry === '') {
        return
    }
    searchCountries(findCountry);
}

function searchCountries(onInput) {
    return fetch(MY_URL)
    .then((response) => {
        if(!response.ok) {
            throw new Error();
        }
    return response.json();
    })
    .then ((allCountries) => {
        const newArrey = [];
        for (const country of allCountries) {
            if (country.name.common.toLowerCase().includes(onInput)) {
                newArrey.push(country);
            }
        }
        console.log(newArrey);
        makeMarkup(newArrey);
    })
    .catch ((error) => console.log(error))
    //.finally (() => list.remove()) 
}

function makeMarkup(arr) {
    if (arr.length < 1) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (arr.length === 1) {
        list.innerHTML = doMarkup(arr);
    } else if (arr.length >= 2 && arr.length <= 10) {
        list.innerHTML = createMarkup(arr);
        console.log(createMarkup(arr));
    } else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

function doMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { common }, capital, population, languages}) => 
    `<li>
    <h2><img src="${svg}" alt="${alt}" width='25'>  ${common}</h2>
    <h3>Capital: ${capital}</h3>
    <h3>Population: ${population}</h3>
    <h3>languages: ${languages}</h3>
    </li>`).join('');
}

function createMarkup(arr) {
    return arr.map(({ flags: { svg, alt }, name: { common } }) => 
    `<li>
        <h3><img src="${svg}" alt="${alt}" width='25'>  ${common}</h3>
    </li>`).join('');
}
