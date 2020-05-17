"use strict";
var getBook = function(query) {
  $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?",
      data: {
        q: query,
      }
    })
    .done(function(data) {
      var booksArray = data.items;

      //clear previous results before rendering new collection
      $(".book-search-result").html("");

      if (booksArray) {
        $.each(booksArray, function(index, book) {
          var normalizedBook = normalizeBookItem(book);
          $(".book-search-result")
            .append(renderTemplate(normalizedBook))
        })
      } else {
        $(".book-search-result").html("<p class='plug'>No matches</p>");
      }
    })
    .fail(function(xhr) {
      console.log("error", xhr);
    });
};

var normalizeBookItem = function(book) {
  return {
    //checking for undefined image links
    "img": book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "../img/image-not-available.jpg",
    "title": book.volumeInfo.title,
    // checking for undefined authors
    "authors": book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A",
    "desc": book.volumeInfo.description || "N/A",
    "link": book.volumeInfo.infoLink,
  };
}

var renderTemplate = function(normalizedBook) {
  return `<div class="result-item">
            <div class="result-img-wrap">
              <img src=${normalizedBook.img} class="result-img">
           </div>

            <div class="result-info">
              <h4 class="info-title">${normalizedBook.title}</h4>
              <h6 class="info-author">${normalizedBook.authors}</h6>
              <p class="info-desc">${normalizedBook.desc}</p>
              <a href=${normalizedBook.link} target="_blank" class="info-link">See more</a>
            </div>
          </div>`
}

$(document).ready(function() {
  $(".book-search-input").on("input", $.debounce(3000, function() {
    var value = $(this).val();
    if (value.length >= 3) {
      getBook(value);
    }
  }))

  $(document)
    .ajaxStart(function() {
      $(".spinner-ring").show();
    })
    .ajaxStop(function() {
      $(".spinner-ring").hide();
    });
});