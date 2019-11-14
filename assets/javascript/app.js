
// array of charities
var charities = ["United Way", "Habitat for Humanity", "HealthWell Foundation", "Population Services International", "Feeding America"];
  
        
  
// Function for displaying charity buttons
function renderButtons() {

  // Deleting the charities prior to adding 
  $("#buttons-view").empty();

  // Looping through the array of charities
  for (var i = 0; i < charities.length; i++) {

    // dynamicaly generating buttons for each charity in the array
    var btn = $("<button>");
    // Adding a class of charity-btn to our button
    btn.addClass("charity-btn");
    // Adding a data-attribute
    btn.attr("data-name", charities[i]);
    // Providing the initial button text
    btn.text(charities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(btn);
  }
}

// This function handles events when we want to add a charity button
$("#add-charity").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var charity = $("#charity-input").val().trim();

  // Adding charity from the textbox to our array
  charities.push(charity);

  // Calling renderButtons to handle the buttons in the array
  renderButtons();
});

// Calling renderButtons to handle the initial buttons in the array
renderButtons();





function displayCharityImgs() {
  // In this case, the "this" keyword refers to the button that was clicked
  var charity = $(this).attr("data-name");

  // Constructing a URL to search Giphy for retrieving images
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    charity + "&api_key=01bjyV9npbshbd7V0vHbxja9NrATk1ll&limit=20";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping through result items
      for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // create tag with the result item's rating
          var ratingTag = $("<p>").text("Rating: " + rating.toUpperCase());
          var imageURL = results[i].images.fixed_height.url;
          var parsedURL = imageURL.slice(0, imageURL.indexOf('.gif'));

          var charityImg = $("<img>");

          charityImg.attr("class", "gifImage");

          charityImg.attr("src", parsedURL+"_s.gif");
          charityImg.attr("data-still", parsedURL+"_s.gif");
          charityImg.attr("data-animate", parsedURL+".gif");
          charityImg.attr("data-state", "still");

          // Appending the paragraph that is created to the div
          gifDiv.append(ratingTag);
          gifDiv.append(charityImg);

          // gifDiv prepended to HTML
          $("#charitiesView").prepend(gifDiv);
      }
    });
}

$(document).on("click", ".charity-btn", displayCharityImgs);

$(document).on("click",".gifImage", function() {
  // clicking on the images will change the data-state attribute 
  if ($(this).attr("data-state") === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});