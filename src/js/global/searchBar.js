function submitSearch(e) {
  e.preventDefault();
  document.location.href='/search/?query='+$('#search-string').val().trim();
  }