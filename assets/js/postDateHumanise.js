$('.postDate').each(function (i, obj) {
  obj.innerHTML = moment(obj.innerHTML, "YYYY-MM-DD HH:mm Z").fromNow();
});