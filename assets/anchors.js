$(function() {
  var $headers = $("article h1:not('.post-title'), article h2, article h3, article h4")

  $headers.each(function(i) {
    var $header = $(this)
    $header.append(makeHeaderAnchor($header.attr('id')))
  });
});

function makeHeaderAnchor(permalink) {
  var icon = '<i class="material-icons">link</i>'
  return `<a class="anchor" href="#${permalink}">${icon}</a>`
}
