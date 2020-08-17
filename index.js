'use strict';

const apiKey = "kcBGlhWhztGUbeXPLZJWHwpkf452cInj0eXpFPX0";

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.value.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3>${responseJson.value[i].fullName}</h3>
      <p>${responseJson.value[i].description}</p>
      <p>By ${responseJson.value[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=50) {
  const params = {
  /*  parkCode: query,
    stateCode: query,
    limit: query,
    start: query, */
    q: query, 
   /* sort: query,
    pageSize: maxResults,*/
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?api_key='+ apiKey + "&" + queryString;

  console.log(url);

 /* const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };
*/
  fetch(url)
    .then(response => response.json())
.then(responseJson => {console.log(responseJson);

});
      /*if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    */
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);