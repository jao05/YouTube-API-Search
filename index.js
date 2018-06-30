const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function createRequest( searchTerm, callBackFunction )
{
  // create request
  const requestQuery = 
  {
    q: `${searchTerm}`,    
    key: 'AIzaSyAJmE7PnY-JeE5bWuJcBXQdCxWPZklc8lM',
    part: 'snippet',
    pageToken: "CAUQAA"
  }
  
  // send request
  $.getJSON(YOUTUBE_SEARCH_URL, requestQuery, callBackFunction);  
  
} // end  function createRequest



function renderResponse( result )
{
  // Developer should take a look at response documentation to understand results
  // Then render the thumbnails to the page
  return `<div><a href="http://youtube.com/watch?v=${ result.id.videoId }"><p>${ result.snippet.title }</p><img class="thumbnail" alt="thumbnail of video" src="${ result.snippet.thumbnails.medium.url }"></a></div><p><a href="http://youtube.com/channel/${ result.snippet.channelId }">See more from this channel</a></p>`

} // end function renderResponse



function displayYouTubeSearchData( data )
{
  // Takes in JSON data 
  
  // Will store strings to be displayed by calling renderResponse for all results
  
  /****ALTERNATE WAY TO PROCESS----------------------------------------   
  // const results = data.items.map(item => renderResponse(item));
   -----------------------------------------------------------*****/
  
  let results = "";
  
  results += `<p>The search return ${ data.items.length } results</p>`
  
  for( let count = 0; count < data.items.length; count++ )
  {
   let item = data.items[ count ];
   let itemHTML = renderResponse( item );
   results += itemHTML;
  }
  
  $('.js-searchResults').html(results);

  // Display by adding to the DOM 


} // end function displayYouTubeSearchData



function listenForSubmission()
{
  //add event listener to the form element
  $( '.js-searchForm' ).submit( function( event )
  {
    // prevent default submission behavior
    event.preventDefault();
    
    // store the user's submission text in a query variable
    const queryElement = $( this ).find('.js-query');
    const query = queryElement.val();
    
    // clear out the search box
    queryElement.val("");

    // call createRequest to send query to server
    createRequest( query, displayYouTubeSearchData );    
  } );

} // end function listenForSubmission

$( listenForSubmission );