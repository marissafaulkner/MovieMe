'use strict'

// tastedive api key = 314781-MarissaF-SHF4KEGS

const TASTEDIVE_ENDPOINT_URL = 'http://tastedive.com/api/similar';


function getDataFromTasteDiveApi(searchTerm, callback) {
  const settings = {
    url: TASTEDIVE_ENDPOINT_URL,
    data: {
      q: searchTerm,
      type: 'movies',
      info: 1,
      limit: 20,
      k: '314781-MarissaF-SHF4KEGS'
    },
    crossDomain: true,
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}



function renderMovieVideo(result) {
	console.log('test', result)
	return `
	<div>
		<iframe id="inlineFrameExample"
    		title="Inline Frame Example"
   			 width="300"
   			 height="200"
   			 src="${result.Similar.Info[0].yUrl}">
		</iframe>
	</div>
	`
}


function displayMovieVideo(data) {
	$('.js-video').html(renderMovieVideo(data));
	console.log('test', data)
}



function renderResult(result) {
  return `
    <div>
      <p>${result.Name}</p>
      <p>${result.wTeaser}</p>
    </div>
  `;
}



function displayTasteDiveSearchData(data) {
	console.log(data)
  const movieResults = data.Similar.Results.map((item, index) => renderResult(item));

  $('.js-search-results').html(movieResults);


}


function displayAllResults(data) {
	displayTasteDiveSearchData(data);
	displayMovieVideo(data);

}



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");

    getDataFromTasteDiveApi(query, displayAllResults);

  });
}

$(watchSubmit);