let axios = require('axios');
let express = require('express');
let api = express.Router();

let corona_api = "https://corona-api.com/countries"

let total_countries_tracked = 5

//Gets data from the api.
api.get('/countries', (req, res) => {
    axios.get(corona_api)
    .then(response => {
        let object = find_top_five_countries_by_confirmed_cases( response.data.data )
        console.log( object )
        res.json( object )
    })
    .catch( error => {
        let error_object = {
            error: true,
            status_code: error.request.res.statusCode,
            status_mssage: error.request.res.statusMessage
        }
        res.json( error_object )
    })
})


function generate_country_object( country_data ) { 
    let country_name = country_data.name;
    let confirmed = country_data.latest_data.confirmed;
    let recovered = country_data.latest_data.recovered;
    let deaths = country_data.latest_data.deaths;
    let country_info = {
        "seriesname": country_name,
        "data": [
            { "confirmed": confirmed },
            { "recovered": recovered },    
            { "deaths": deaths },
        ]     
    }
    return country_info;
}

function find_top_five_countries_by_confirmed_cases( country_data ) {
    let object = [];
    for( let country of country_data) {
        let confirmed = country.latest_data.confirmed;
        if( object.length < total_countries_tracked ) {
            object.push(generate_country_object(country));
        }
        else {
            let index_of_smallest_confirmed_country_from_set = find_index_of_smallest_confirmed_case( object );
            if( confirmed > object[index_of_smallest_confirmed_country_from_set].data[0].confirmed ) {
                object[index_of_smallest_confirmed_country_from_set] = generate_country_object(country);
            }
        }
    }
    return object;
}
    
function find_index_of_smallest_confirmed_case( top_five_countries ) {
    let current_smallest = top_five_countries[0];
    for( let country of top_five_countries ) {
        if( country.data[0].confirmed < current_smallest.data[0].confirmed ) {
            current_smallest = country;
        }
    }
    let index_of_smallest = top_five_countries.findIndex((country) =>
        country.seriesname === current_smallest.seriesname
    )
    return index_of_smallest;
}

module.exports = api;