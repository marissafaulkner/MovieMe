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
      limit: 18,
      k: '314781-MarissaF-SHF4KEGS'
    },
    crossDomain: true,
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}


//diplays search result header text
function renderSearchResultText(data) {
	return `
	<div class="allAboutHeaderBox">
		<h2>All about ${data.Similar.Info[0].Name}</h2>
	</div>
	`;
}

function displaySearchResultText(data) {
	$('.js-search-title').html(renderSearchResultText(data));
}



//diplays movie synopsis
function renderMovieSynopsis(data) {
	return `
	<div class="boxes-synopsis"> 
		<h3>Synopsis</h3>
		<p>${data.Similar.Info[0].wTeaser}</p>
	</div>
	`;
}


function displayMovieSynopsis(data) {
	$('.js-synopsis').html(renderMovieSynopsis(data));
}




//display movie trailer
function renderMovieVideo(result) {
	return `
	<div class="boxes-video">
		<iframe
    		title="${result.Similar.Info[0].Name} Movie Trailer"
   			 width="300"
   			 height="200"
   			 src="${result.Similar.Info[0].yUrl}">
		</iframe>
	</div>
	`
}


function displayMovieVideo(data) {
	$('.js-video').html(renderMovieVideo(data));
}


//display other movies like searched movie
function renderResult(result) {

  return `
      <li><a class="movieRecs" href="">${result.Name}</a></li>
  `;

}



function displayTasteDiveSearchData(data) {
	console.log(data)
  const movieResults = data.Similar.Results.map((item, index) => renderResult(item));
	

  $('.js-search-results').html(movieResults);




}





//working movie recomendation links
function handleMovieRecLinks(data) {
	let movieName;

	$('a').each(function() {
    $(this).on('click', function(e) {
    	event.preventDefault();

    	let movieName = $(this).text();

    	data.Similar.Results.forEach(movieObj => {
    		if (movieName === movieObj.Name) {
    			getDataFromTasteDiveApi(movieObj.Name, displayAllResults);
    		}
		});
    });
});

}



//display recommended movies header
function renderMovieRecsTitle(data) {
	return `
	<div class="boxes-recs">
		<span class="centered-recs">
		<h3>Other movies like ${data.Similar.Info[0].Name}</h3>
			<ul class="js-search-results">
					
			</ul>
		</span>
	</div>

	`;
}


function displayMovieRecsHeader(data) {
	$('.js-movie-recs').html(renderMovieRecsTitle(data));
}



//handles no results page
function renderNoResultsFound(data) {
	const noResults = $('.js-no-results')

	noResults
		.prop('hidden', false)
		.html(displayNoResultsFound (data));
}


function displayNoResultsFound (data) {
	return `
	<div class="noResults">
	<p class="noResultsText">Sorry, no results found for ${data.Similar.Info[0].Name}.</p>
	</div>
	`
}


//clears page for next search
function handlesClearPage() {
	return `

	<div class="movieDetails">
		<div class="js-search-title"></div>

		<div class="js-video"></div>

		<div class="js-synopsis"></div>

	</div>


	<div class="js-movie-recs"></div>
	`
}


//display functions
function displayAllResults(data) {

	$('.js-no-results').html('');

	const resultsPage = $('.js-results')
		.prop('hidden', false)
		.html(handlesClearPage());

	if (data.Similar.Results.length === 0) {
		renderNoResultsFound(data);

	} else {
		displayMovieRecsHeader(data);
		displayTasteDiveSearchData(data);
		displayMovieVideo(data);
		displaySearchResultText(data);
		displayMovieSynopsis(data); 
		handleMovieRecLinks(data);
	
	}
	

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