'use strict'

// tastedive api key = 314781-MarissaF-SHF4KEGS

const TASTEDIVE_ENDPOINT_URL = 'https://tastedive.com/api/similar';


function getDataFromTasteDiveApi(searchTerm, callback) {
  const settings = {
    url: TASTEDIVE_ENDPOINT_URL,
    data: {
      q: `${searchTerm} in:name`,
      type: 'movies',
      info: 1,
      limit: 20,
      k: '314781-MarissaF-SHF4KEGS',
      callback: callback
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);