var currentLang = $(":root").attr("lang")

$(function() {
  setLanguage(currentLang)
  $("#switch-lang").click(toggleLanguage)
});

function toggleLanguage() {
  if (currentLang == "sk") {
    setLanguage("en")
  } else if (currentLang == "en") {
    setLanguage("sk")
  }
}

function setLanguage(language) {
  console.log("Setting language: " + language)

  currentLang = language
  $(".container, footer").attr("lang", language)

  if (language == "sk") {
    $("#switch-lang").text("Read in English")
    findElementsByLanguage("sk").show()
  } else {
    findElementsByLanguage("sk").hide()
  }

  if (language == "en") {
    $("#switch-lang").text("Čítať v Slovenčine")
    findElementsByLanguage("en").show()
  } else {
    findElementsByLanguage("en").hide()
  }
}

function findElementsByLanguage(language) {
  return $(".container :lang(" + language + "), " +
           "footer :lang(" + language + ")")
}
