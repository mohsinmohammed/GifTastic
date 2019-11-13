
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

  // Adding movie from the textbox to our array
  charities.push(charity);

  // Calling renderButtons to handle the buttons in the array
  renderButtons();
});

// Calling renderButtons to handle the initial buttons in the array
renderButtons();
