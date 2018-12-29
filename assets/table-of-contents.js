$(function() {
  var $container = $(".post-header")
  var $headers = $("article h2")

  if ($headers.length == 0) {
    return
  }

  var $toc = $("<div class='toc'/>")
  $toc.append($("<p class='toc-title'/>").text("Contents"))
  var $contents = $("<ol/>")
  appendSections($contents, $headers)
  $toc.append($contents)
  $container.append($toc)
});

function appendSections($target, $sections) {
  $sections.each(function(i) {
    var $section = $(this)
    $target.append(makeListItem($section))
  });
}

function makeListItem($section) {
  var $listItem = $("<li/>")

  var text = $section.text()
  var anchorUrl = $section.attr("id")
  return $listItem.append(`<a href="#${anchorUrl}">${text}</a>`)
}
