// The text to use NB use \n not real life line breaks!
input_text = "";
// Where to fill up
target_setting = $("#output");
// Launch that function!
type(input_text, target_setting, 0);

function type(input, target, current){
  // If the current count is larger than the length of the string, then for goodness sake, stop
	if(current > input.length){
    // Write Complete
		console.log("Complete.");
	}
	else{
    // Increment the marker
		current += 1;
    // fill the target with a substring, from the 0th character to the current one
		target.text(input.substring(0,current));
    // Wait ...
		setTimeout(function(){
      // do the function again, with the newly incremented marker
			type(input, target, current);
		});
	}
}

/*
 * The typing test stuff
 */

var character_length = 31;
var index = 0;
var letters =  $("#input_text").val();
var current_string = letters.substring(index, index + character_length);

$("html, body").click(function(){
  $("#textarea").focus();
});

$("#target").text(current_string);
$(window).keypress(function(evt){
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charTyped = String.fromCharCode(charCode);
  if(charTyped == letters.charAt(index)){
    index ++;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
    $("#your-attempt").append(charTyped);
    if(index == letters.length){
      stop();
      finished();
    }
  }else{
    $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
    errors ++;
    $("#errors").text(errors);
  }
});


var errors = 0;

$("#reset").click(function(){
  reset();
});


function reset(){
  $("#input_text").blur().hide();;
  $("#your-attempt").text("");
  index = 0;
  errors = 0;
  letters = $("#input_text").val();
  current_string = letters.substring(index, index + character_length);
  $("#target").text(current_string);
  $("#incomplete-wrap").slideDown();
  $("#complete-wrap").slideUp();
  $("#focus").html("Find out if you can create code! Start by typing a &lt;")
}

function finished(){
  $("#incomplete-wrap").slideUp();
  $("#complete-wrap").slideDown();
  $("#focus").html("You just created the coding structue need for any website!");
  $("#score").html("<p>13 HTML tags created, with only " + errors + " errors.</p> <p>Professional developers often make mistakes, the more mistakes you make and correct the faster you can learn the more you will know and the better developer you will become.</p> <p>To try again, hit the reset button at the bottom of your screen.</p>")
}

