function fetchCountries(findCountry) {
    return fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
    .then((response) => {
        if(!response.ok) {
            throw new Error();
        }
    return response.json();
    })
    .then ((allCountries) => {
        const newArrey = [];
        for (const country of allCountries) {
            if (country.name.common.toLowerCase().includes(findCountry)) {
                newArrey.push(country);
            }
        }
        return newArrey;
    })
    .catch ((error) => console.error(error));
}

export default { fetchCountries };
