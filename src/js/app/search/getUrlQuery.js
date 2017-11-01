function getSearchString(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
    results = regex.exec(location.search);

  results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

  console.log(results[1]);

  return results[1];
}

function searchAlgolia(queryString) {

  var applicationID = 'C942ZS1PX5';
  var apiKey = '23eb0838f30a73195376bd988744a31c';
  var indexName = 'prod_Index';

  var client = algoliasearch(applicationID, apiKey);
  var helper = algoliasearchHelper(client, indexName, {
    query: queryString,
    disjunctiveFacets: ['category']
  });

  helper.on('result', function(content) {
    renderHits(content);
  });

function crudeSentenceSnipperiserotronomatic3000(fullContent) {

  var splitContent = fullContent.split('.');
  var snippets = [];

  for (var sent in splitContent) {
    if (splitContent.hasOwnProperty(sent)) {

      if (splitContent[sent].includes('<em>')) {
        snippets.push(snippetLister(splitContent[sent]));
      }
    }
  }

  return snippets;

}

function snippetLister(snippet) {
  return '<p class="snippet-list-item">' + snippet + '</p>'
}

  function renderHits(content) {
    $('#content').html(function() {
      return $.map(content.hits, function(hit) {

        var snippets = crudeSentenceSnipperiserotronomatic3000(hit._highlightResult.content.value);

        var response = '<div>'
        + '<div class="link-panel-container">'
        +    '<a href="' + hit.url + '" aria-label="' + hit.title + '">'
        +        '<span class="link-panel"></span>'
        +    '</a>'
        +    '<div class="blog-preview-title post-brand">' + hit.title + '</div>'
        +    '<div class="posted-statement">posted '
        +        '<span class="postDate">' + moment(hit.date, "YYYY-MM-DD HH:mm Z").fromNow() + '</span>'
        +    '</div>'
        + '</div>'
        + '<blockquote>'
        +    '<p class="blog-preview-excerpt">'
        +       '<div class="snippet-list-container">';

        for (var snippet in snippets) {
          if (snippets.hasOwnProperty(snippet)) {
            response += snippets[snippet];

          }
        }

        response += '</div>'
        +    '</p>'
        + '</blockquote>'
        + '</div>'
        + '<hr>';

        return response;
      });
    });
  }

  helper.search();

}

$(document).ready( function runSearch() {
  var queryString = getSearchString('query');

  // don't do anything if there was no query
  if (queryString == '') {
    return;
  }

  searchAlgolia(queryString);
});